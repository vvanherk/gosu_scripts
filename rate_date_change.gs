var pp = Job.slicedPeriod("7018552")
print(pp)

if (pp.FLiabLine_CGExists) {
  var l = pp.FLiabLine_CG
  print({ l.RateDate_CG, l.ReferenceDateInternal })
//  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
//    var tx = bundle.add(l)
//    tx.ReferenceDateInternal = l.RateDate_CG
//  }, "fcoruw1")
}

