
//var pp=job.slicedPeriod("109735")
//var pp=job.slicedPeriod("160514")

var pp=job.slicedPeriod("374438")

var p = pp.Policy
print("Policy is: " + p.Product + " - Policy Period is: " + pp)


   pp.AllCoverages.each(\ c ->{
     print(c.DisplayString_CG)
     print(c.IncludeLimitForReinsTIV_CG)
   })


 

//reset("374438")
//
//function reset(jobNumber : String) {
//   unlock(jobNumber)
//  try {
//    gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
//      var pp = Job.slicedPeriod(jobNumber)
//      bundle.add(pp)
//      pp.AllCoverages.each(\ c ->{
//        bundle.add(c)
//        c.IncludeLimitForReinsTIV_CG = null
//      })
//    }, "su")
//  } finally {
//    lock(jobNumber)
//  }
//} 
//
//function unlock(jobnum : String) {
//  var pp = Job.slicedPeriod(jobnum)
//  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
//    bundle.add(pp)
//    pp.setFieldValue("Locked", false)
//  }, "su")
//}
//
//function lock(jobnum : String) {
//  var pp = Job.slicedPeriod(jobnum)
//  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
//    bundle.add(pp)
//    pp.setFieldValue("Locked", true)
//  }, "su")
//}  
//
//
//
