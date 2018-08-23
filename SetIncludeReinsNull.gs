
reset("")


function reset(jobNumber : String) {
  try {
    unlock(jobNumber)
    var pp = Job.slicedPeriod(jobNumber)
    pp.AllCoverages.each(\ c ->{
      gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
        bundle.add(c)
        c.IncludeLimitForReinsTIV_CG = null
      }, "su")
    })
  } finally {
    lock(jobNumber)
  }
}

function unlock(jobnum : String) {
  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
    var pp = bundle.add(Job.slicedPeriod(jobnum))
    pp.setFieldValue("Locked", false)
  }, "su")
}

function lock(jobnum : String) {
  gw.transaction.Transaction.runWithNewBundle(\ bundle ->{
    var pp = bundle.add(Job.slicedPeriod(jobnum))
    pp.setFieldValue("Locked", true)
  }, "su")  
} 