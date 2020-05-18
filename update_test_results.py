import os
import arcgis.gis
import arcgis.features
import arcpy
import pandas
from datetime import datetime
from pytz import timezone
from tzlocal import get_localzone

# To allow overwriting outputs change overwriteOutput option to True.
arcpy.env.overwriteOutput = True

# Work from home
# fgdb = "C:/Users/brian/source/repos/react-cap/covid19_solution.gdb"
# At the office
# K:
fgdb = r"\\clatsop.co.clatsop.or.us\Data\Applications\GIS\Emergency_Management\covid19\covid19_solution.gdb"
# fgdb = "C:/Users/bwilson/source/repos/react-cap/export.gdb"
gdb  = "cc-gis.sde"

localnow = datetime.now()
pst_str = localnow.strftime("%Y%m%d_%H%M%S")
output_fc = "test_results_" + pst_str

def local2utc(t):
    return t.astimezone(timezone('UTC'))

def fetch_data(output_fc):
    """ Download today's data from the OHA site
        Save it to a local feature class """

    counties = "altName='Clatsop' OR altName='Columbia' OR altName='Tillamook' OR altName='Lincoln' OR altName='Clackamas' OR altName='Multnomah' OR altName='Washington'"
    
    # We might as well archive all the fields locally.
    #fields = ["altName", "Cases", "NegativeTests", "Deaths"]
    fields="*"

    try:
        layer = arcgis.features.FeatureLayer(url="https://services.arcgis.com/uUvqNMGPm7axC2dD/ArcGIS/rest/services/COVID_Cases_Oregon_Public/FeatureServer/0")
        sdf = layer.query(where=counties, out_fields=fields).sdf
    except Exception as e:
        print("Failed connection", e)
        exit(0)

    print(sdf)
    sdf.spatial.to_featureclass(output_fc)
    return

def append_to_database(output_fc, output_db):
    """ Use the data fetched from OHA
        Add timestamp fields
        Append it to the existing database feature class, remapping fieldnames. """

    # Process: Add Field (Add Field)
    arcpy.AddField_management(in_table=output_fc,
        field_name="CreateDate", field_type="DATE", field_precision=None,
        field_scale=None, field_length=None, field_alias="", 
        field_is_nullable="NULLABLE", field_is_required="NON_REQUIRED", 
        field_domain="")
        
    arcpy.AddField_management(in_table=output_fc,
        field_name="utcCreateDate", field_type="DATE", field_precision=None,
        field_scale=None, field_length=None, field_alias="", 
        field_is_nullable="NULLABLE", field_is_required="NON_REQUIRED", 
        field_domain="")

    # Process: Calculate Field (Calculate Field)
    pst_createdate = localnow.strftime("\"%m/%d/%Y %H:%M:%S\"") # quotes are for Calc
    arcpy.CalculateField_management(in_table=output_fc, 
        field="CreateDate", expression=pst_createdate, 
        expression_type="PYTHON3", code_block="", field_type="TEXT")

    utcnow = local2utc(localnow)
    utc_createdate = utcnow.strftime("\"%m/%d/%Y %H:%M:%S\"") # quotes are for Calc
    arcpy.CalculateField_management(in_table=output_fc, 
        field="utcCreateDate", expression=utc_createdate, 
        expression_type="PYTHON3", code_block="", field_type="TEXT")

    # Process: Append (Append)
    arcpy.Append_management(inputs=[output_fc], 
        target=output_db, schema_type="NO_TEST", 
        field_mapping=
            "positive \"positive\" true true false 4 Long 0 0,First,#," + output_fc + ",Cases,-1,-1;" + 
            "negative \"negative\" true true false 4 Long 0 0,First,#," + output_fc + ",NegativeTests,-1,-1;" + 
            "CreateDate \"CreateDate\" true true false 8 Date 0 0,First,#," + output_fc + ",CreateDate,-1,-1;" + 
            #"utcCreateDate \"utcCreateDate\" true true false 8 Date 0 0,First,#," + output_fc + ",utcCreateDate,-1,-1;" + 
            "county \"county\" true true false 25 Text 0 0,First,#," + output_fc + ",altName,-1,-1;"
            "deaths \"deaths\" true true false 4 Long 0 0,First,#," + output_fc + ",Deaths,-1,-1", 
        subtype="", expression="")
    return

#============================================================================

with arcpy.EnvManager(scratchWorkspace=fgdb, workspace=fgdb):
    fetch_data(output_fc)

    final_dest = os.path.join(gdb, "covid19_test_results") # write to SQL database
#   final_dest = "test_results_fc" # Write to file geodatabase (via workspace)
    append_to_database(output_fc, final_dest)
print("All done!")

