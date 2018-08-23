
var pp = Job.slicedPeriod("175527")
print(pp)

//print(pp.FLiabLine_CG.covFLDrone)

pp.AllCoverages.each(\ cov11 ->{
  print(cov11)})

var coverages  = pp.AllCoverages
coverages.each(\ c -> {
  print(c) })

pp.AllCoverages.whereTypeIs(covCPDrone).each(\ cov ->{
  var cbl = cov.CPropCommSchedule_CG
  print("coverage is " + cov)
  print("coverable is " + cbl)
//  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
//    bundle.add(cbl)
//    cbl.removeCoverageFromCoverable(cov)
//  }, "fcoruw1")
  print(cov)
})
