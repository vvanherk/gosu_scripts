uses gw.api.reinsurance.ReinsurableCoverable

//var pp = Job.slicedPeriod("177558")
//var pp = Job.slicedPeriod("144373")
var pp = Job.slicedPeriod("175527")


print("-".repeat(120))

//var sub = pp.BasedOn
pp.FPropLine_CG.AllCoverageCosts.each(\ cc ->{
  var cov = cc.Coverage
  print("  ${cov.PatternCode} " + { typeof cc })
} )

print("-".repeat(120))

pp.CPropLine_CG.AllCoverageCosts.each(\ cc ->{
  var cov = cc.Coverage
  print("  ${cov.PatternCode} " + { typeof cc })
} )

print("-".repeat(120))

pp.CPropLine_CG.AllCoverables.each(\ cc ->{
  print(cc)
  print( { typeof cc } + "  " + {cc typeis ReinsurableCoverable} )
} )





