uses gw.api.productmodel.PolicyLinePattern

 
var fliabLine : PolicyLinePattern = "FLiabLine_CG"

fliabLine.getCoverageCategory("FLiabEndorsementLiability").CoveragePatterns.each(\ cp ->{

  print(cp.Code + { cp.Priority })

}) 
