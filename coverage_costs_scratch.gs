var pp = Job.slicedPeriod("177336")

pp.FPropLine_CG.AllCoverageCosts.each(\ cc ->{
  var cov = cc.Coverage

//  print(cov.PatternCode + " " + typeof cc)
  
  print("  ${cov.PatternCode} " + {
    typeof cc
  })
} )