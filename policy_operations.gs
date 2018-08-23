uses gw.api.productmodel.CoveragePattern
uses ca.cooperators.pc.cooputils.RuralDwellingUtils_CG

uses java.util.Map


var pp=job.slicedPeriod("5481400")  // dev - potato
var p = pp.Policy
print("Policy is: " + p.Product + " - Policy Period is: " + pp)

print("-".repeat(100))

  for(x in pp.PolicyOperations_CG) {
    print(x)
    print(x.Branch)
    print(x.Branch.ID)
    if(x.Operation_CG.IBCSplitCode.equalsIgnoreCase("0121d00")) {
      print("Has Potato")
    }
  }
  
		


