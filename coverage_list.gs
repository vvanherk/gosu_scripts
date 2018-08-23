
//var pp = Job.slicedPeriod("175527")  //local
var pp = Job.slicedPeriod("1584187") //DEV

print("Policy Period is: " + pp)
print("")

//print(pp.FLiabLine_CG.covFLDrone)

pp.AllCoverages.each(\ cov11 ->{
  print(cov11.PatternCode)
})

var coverages  = pp.AllCoverages
coverages.each(\ c -> {
  //print(c) 
})

pp.AllCoverages.whereTypeIs(covCPDrone).each(\ coverage ->{
  var coverable = coverage.CPropCommSchedule_CG
  print("coverage is " + coverage)
  print("coverable is " + coverable)
  
  var commSched = coverable.CommSchedule_CG
  
  if(commSched Typeis Drone_CG) {
    print("Ownership is: " +  commSched.OriginalPurchaser_CG)
    print("Year Purchased is: " + commSched.YearPurchased_CG)
    print("Policy Period Effective Date is: " + commSched.Branch.EditEffectiveDate.YearOfDate)
    
    if((commSched?.Branch?.EditEffectiveDate?.YearOfDate - commSched?.YearPurchased_CG) <= 3) {
          print("retval = true")
    }
  
  }
  
  
})
  
