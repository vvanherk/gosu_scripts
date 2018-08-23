//var pp = Job.slicedPeriod("120567")  // local wo - mlt
//var pp = Job.slicedPeriod("28353896")  // dev wo


var jobNumber = "122236"     // local policy
//var jobNumber = "120567"     // local policy
//var jobNumber = "8264847"    // dev policy from alex
//var jobNumber = "28353896"   // dev policy from bianca test case
var pp = find(x in Job where x.JobNumber == jobnumber).AtMostOneRow.SelectedVersion

//print(pp)

// Drone experience
var droneExperience = 0

var recentDroneYear = pp.PeriodStart?.YearOfDate
var lastDroneYear = pp.PeriodStart?.YearOfDate

print(recentDroneYear)

var boundPeriods = pp.Policy?.BoundPeriods.orderByDescending(\ p -> p.EditEffectiveDate)

for(bp in boundPeriods) {
  print(bp)
}

print("\n-----------------------------\n")


for(bp in boundPeriods) {
  
  if(bp.FLiabLine_CG?.covFLDroneExists) {
    lastDroneYear = bp.PeriodStart?.YearOfDate
    print("Drone Exists: " + bp.FLiabLine_CG.covFLDrone.Branch)
  }
  else {
    print("Drone Not Exists: " + bp)
    break
  }
    
}

droneExperience = recentDroneYear - lastDroneYear
print(droneExperience)

var dflLines = pp.Policy?.BoundPeriods*.FLiabLine_CG.where(\ fl -> fl.covFLDroneExists )

// vvh - todo - remove print statements
print("dfLines.Count: " + dflLines.Count)

//if(dflLines.Count > 0) {
//var minLine = dflLines?.minBy(\ dfl -> dfl.Branch.PeriodStart)
//print("Period Year is: " + periodYear)
//print("Min Period Year is: " + minLine?.Branch?.PeriodStart?.YearOfDate)
//droneRatingData.DroneExperience = periodYear - minLine?.Branch?.PeriodStart?.YearOfDate

