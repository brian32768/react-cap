from datetime import datetime
from pytz import timezone
from tzlocal import get_localzone

format = "%Y-%m-%d %H:%M:%S %Z%z"

# Current time in UTC
now_utc = datetime.now(timezone('UTC'))
print(now_utc.strftime(format))

# Convert to local time zone
now_local = now_utc.astimezone(get_localzone())
print(now_local.strftime(format))



# take CreateTime and use it to generate utcCreateTime
pdt = datetime.strptime("5/14/2020 4:42:00 PM", "%m/%d/%Y %I:%M:%S %p")
print(pdt.strftime(format))

utc = pdt.astimezone(timezone('UTC'))
print(utc.strftime(format))


pdt = datetime.strptime("5/14/2020 4:42:00 PM", "%m/%d/%Y %I:%M:%S %p")

utc = datetime.strptime("5/14/2020 10:35:59 PM", "%m/%d/%Y %I:%M:%S %p")

# code snippet for ArcGIS Pro

# Convert a datetime from localtime to UTC
from pytz import timezone
def l2u(p):
    return p.astimezone(timezone('UTC'))

# Convert a datetime from UTC to localtime
from pytz import timezone
from tzlocal import get_localzone
def u2l(p):
    # Force input into UTC
    p.replace(tzinfo=timezone('UTC'))
    return p.astimezone(get_localzone())

