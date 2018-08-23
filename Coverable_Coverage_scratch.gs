uses gw.api.reinsurance.ReinsurableCoverable

//var pp = Job.slicedPeriod("177558")
//var pp = Job.slicedPeriod("144373")
var pp = Job.slicedPeriod("205772")

//var sub = pp.BasedOn
pp.FPropLine_CG.AllCoverageCosts.each(\ cc ->{
  var cov = cc.Coverage
  print("  ${cov.PatternCode} " + { typeof cc })
} )

pp.FPropLine_CG.AllCoverables.each(\ cc ->{
  print( { typeof cc } + "  " + {cc typeis ReinsurableCoverable} )
  
  if(cc typeis FPropLocation_CG) {
     print(cc.covFPFarmBoilerMachineryExists )
     print(cc.PolicyLocation typeis ReinsurableCoverable)
  }
} )


print("---------------------")

pp.PPropLine_CG.AllCoverables.each(\ cc ->{
  //var cov = cc.Coverage
  print( { typeof cc } + "  " + {cc typeis ReinsurableCoverable} )
} )


//ca.cooperators.pc.rules.RunRules
pp.PPropLine_CG.PPropArticleSchedules_CG.each(\ s -> {
  s.CoveragesFromCoverable.each(\ c -> {
    print(typeof c)
    print(c typeis PPropArticleCov_CG)
  })
})

