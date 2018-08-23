var destinations = gw.api.admin.DestinationMessageStatisticsUtil.getMessageStatistics()
for (d in destinations) {
  if (d.Unsent == 0) continue
  
  print("${d.DestinationName}:${d.DestinationId} " + { d.Status, d.Unsent })
  
  var sooMessages = gw.api.admin.SOOMessageStatisticsUtil.getStatistics(d.DestinationId)
  for (sooMessage in sooMessages) {
    if (sooMessage.Unsent == 0) continue
    print("  ${sooMessage.SafeOrderedObjectName}:${sooMessage.SafeOrderedObjectKeyValue} " + { sooMessage.Error, sooMessage.Inflight, sooMessage.Unsent })
    
    //print(sooMessage.SendTime.toString())
    
    var messages = gw.api.admin.MessagingUtil.getEventMessagesForDestination(d.DestinationId, sooMessage.SafeOrderedObjectKeyValue)
   // for(message in messages) {
   //   if(message.SendTime!=null) {
      //message.SendTime.Calendar.toString()
   //   }
   // }
    
    print("  Skipping Messages: ${messages.Count}")
//    gw.api.admin.MessagingUtil.skipMessages(messages.where(\ m ->m.Skipable))
  }
  
  //gw.api.admin.MessagingUtil.skipMessages(messages)
}
