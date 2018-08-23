uses gw.api.reinsurance.ReinsurableCoverable

//var pp = Job.slicedPeriod("205772") //DEV
var pp = Job.slicedPeriod("106902") //locale



pp.FPropLine_CG.AllCoverables.each(\ cc ->{
  print( { typeof cc } + "  " + { cc typeis ReinsurableCoverable } )

  if(cc typeis FPropLine_CG) {
     print("  ReinsurableCoverable: PolicyLocation:  ${(cc.PolicyLocation typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: Branch: ${(cc.Branch typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: PolicyLine: ${(cc.PolicyLine typeis ReinsurableCoverable)}")
  }

print("------------------------------------") 
  if(cc typeis FPropLocation_CG) {
     print("  ReinsurableCoverable: PolicyLocation:  ${(cc.PolicyLocation typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: Branch: ${(cc.Branch typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: PolicyLine: ${(cc.PolicyLine typeis ReinsurableCoverable)}")
  }
}) 

pp.PPropLine_CG.AllCoverables.each(\ cc ->{
  print( { typeof cc } + "  " + { cc typeis ReinsurableCoverable } )


print("------------------------------------") 
  if(cc typeis PPropLocation_CG) {
     print("  ReinsurableCoverable: PolicyLocation:  ${(cc.PolicyLocation typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: Branch: ${(cc.Branch typeis ReinsurableCoverable)}")
     print("  ReinsurableCoverable: PolicyLine: ${(cc.PolicyLine typeis ReinsurableCoverable)}")
  }
}) 
