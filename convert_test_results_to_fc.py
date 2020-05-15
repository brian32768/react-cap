#
# The goal here is to read the table from OHA each day
# and then update the test_results feature class.
#
# The environment I want to use is here
# C:/Users/brian/AppData/Local/ESRI/conda/envs/arcgispro-py3-vscode
# You must set your environment: 
# CONDA_ENVS_PATH = C:/Users/brian/AppData/Local/ESRI/conda/envs
# and test it with "conda env list" or "conda info --envs"
#
import arcpy

fgdb = "C:/Users/brian/source/repos/react-cap/covid19_solution.gdb"
arcpy.env.workspace = fgdb

# Counties that need to be recorded.

counties = [
    ("Clatsop"), 
    ("Columbia"), 
    ("Tillamook"), 
    ("Clackamas"), 
    "Multnomah", "Washington", ]

source_fc = "orcntypoly_Project"
source_table = "test_results_0422"
dest_fc = "test_results_fc"

# All we need is the location.
fc_fields = ["Shape@", "altName"]

desc = arcpy.da.Describe(source_fc)
#for d in desc:
#    print(d, desc[d])
sref = desc["spatialReference"]
ffields = desc["fields"]
#for field in ffields:
#    print(field.name, field.type)

# Read the feature class, create a geometry lookup table
features = {}
with arcpy.da.SearchCursor(source_fc, fc_fields) as rows:
    for row in rows:
        print(row[1])
        features[row[1]] = row[0]

# Now I have features loaded with geometry objects and indexed

i = 0
in_read_fields = ['county', 'CreateDate', 'positive', 'negative', 'deaths']
#for field in in_fields:
#    print(i, field.name, field.type)
#    i += 1
#    in_read_fields.append(field.name)

# I will need all the attributes here except the stupid old OID
ifields = arcpy.da.Describe(source_table)["fields"]
in_fields = []
for field in ifields:
    if field.name in in_read_fields:
        in_fields.append(field)

# Read the table
# skip the OID and the fkey
table = []
with arcpy.da.SearchCursor(source_table, in_read_fields) as rows:
    for row in rows:
        table.append(row)

try:
    arcpy.Delete_management(dest_fc)
except Exception as e:
    print("Did not delete", dest_fc, e)

arcpy.CreateFeatureclass_management(fgdb, dest_fc, 
    "POLYGON", has_m="DISABLED", has_z="DISABLED", spatial_reference=sref)
for field in in_fields:
    arcpy.AddField_management(dest_fc, 
        field_name=field.name, field_type=field.type, field_length=field.length)

desc = arcpy.da.Describe(dest_fc)
fields = desc['fields']

print("new fc", len(fields))
i = 0
out_fields = []
for field in fields:
    if field.type == 'OID': continue
    if field.name == 'Shape_Length': continue
    if field.name == 'Shape_Area': continue
    if field.type == 'Geometry':
        out_fields.append('SHAPE@')
    else:
        out_fields.append(field.name)
    print(i, field.name, field.type)
    i += 1
pass

out_fields = ['SHAPE@'] + in_read_fields

# Write the new inventory feature class
with arcpy.da.InsertCursor(dest_fc, out_fields) as cursor:
    oid = 1
    for row in table: 
        countyname = row[0]
        newrow = (features[countyname],) + row
        print("newrow len", len(row), len(newrow)) 
        i = 0 
        for field in newrow:
            print(i, out_fields[i], newrow[i])
            i += 1
        cursor.insertRow(newrow)
        oid += 1
    del row

print("records", oid)
# delete the old OID fields


