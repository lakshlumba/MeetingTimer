/*
//-----------------------------------------------------------------------------------------------------
// File Name:	 common.js
// Purpose:	   	 This JS will contain all JS functions related to Meeting Schedule
//------------------------------------------------------------------------------------------------------
// Changes History:
//----------------------------------------------|---------------|---------------------------------------
//  Author:       		Laksh Lumba
//  Supervisor:   		Laksh
//  Change Date:  		01/01/2015
//  Change Description: Common file to create the meeting invite.
//----------------------------------------------------------------
//@ Copyright Northeastern University, 2015.
//This document contains proprietary and confidential
//information, and shall not be reproduced, transferred, or
//disclosed to others, without the prior written consent of Laksh Lumba.
//------------------------------------------------------------------------------------------------------
*/

//json object to capture the events
length = -1;
var data = {items:
				[   {id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""},
					{id:"NA", title:"", description:"",meetingDate:"",startTime:"",endTime:"",totalTime:"",status:""}
				]
		   };
						
//generic function for the documnet.getElementBYID
function elByID(id){
	return document.getElementById(id);
}	
// function to clear the json data
function clearJsonData(){
	localStorage.setItem("jsondata", JSON.stringify(data));
}

//to check if the value is numerical value or not
function isNumeric(elem){
	var numericExpression = /^[0-9]+$/;
	if(elem.match(numericExpression)){
		return true;
	}
	return false;
}
// check if the field is empty or not
function isFieldPopulated(name)
{
	if("" != elByID(name).value && elByID(name).value != null )
	{
		return true;
	}
	return false;
}
// check if the meeting events have proper values 
// and create the json object , if the values are correct and valllidated
// other wise return the error message  
function validateAndCreateEvent(){	
		
	if(!isFieldPopulated("title"))
	{
		// mandatory title not populated
		alert("Please enter the title");
		return;
	}
	if(!isFieldPopulated("description"))
	{
		// mandatory description not populated
		alert("Please enter the description");
		return;
	}
	if(!isFieldPopulated("meetingDate"))
	{
		// mandatory meetingDate not populated
		alert("Please enter the meetingDate");
		return;
	}
	if(!isFieldPopulated("startTime"))
	{
		// mandatory startTime not populated
		alert("Please enter the startTime");
		return;
	}
	if(!isFieldPopulated("endTime"))
	{
		// mandatory endTime not populated
		alert("Please enter the endTime");
		return;
	}
	var title = elByID("title").value;
	var descriptionValue = elByID("description").value;
	var meetingDateValue = elByID("meetingDate").value;
	var startTimeValue = elByID("startTime").value;
	var endTimeValue = elByID("endTime").value;
	var totalTime = getTimeDiffernce(startTimeValue,endTimeValue); 
	if (-1 == totalTime){
		// start time and end time  are not proper
		alert("Please enter correct time");
		return;
	}
	// check the if the length of json is lessa than 7
	if (length < 7){
		createMeetingEvent();
		clearFields();
		data.items[length + 1]["id"] = length + 1;
		data.items[length + 1]["title"] = title;
		data.items[length + 1]["description"] = descriptionValue;
		data.items[length + 1]["meetingDate"] = meetingDateValue;
		data.items[length + 1]["startTime"] = startTimeValue;
		data.items[length + 1]["endTime"] = endTimeValue;
		data.items[length + 1]["totalTime"] = totalTime;		
		length = length + 1;
		elByID("meetingRequestList").value = JSON.stringify(data);
		localStorage.setItem("jsondata", JSON.stringify(data));
	} else {
		alert("No More Meeeting can be scheduled");
	}	
	return;
}
// get the time difference in seconds
function getTimeDiffernce(startTimeValue,endTimeValue){
	var startTime = startTimeValue.split(":");
	var endTime = endTimeValue.split(":");
	if ((startTime[0] > endTime[0])
		|| (startTime[0] == endTime[0] && startTime[1] > endTime[1]) 
		|| (startTime[0] == endTime[0] && startTime[1] == endTime[1] && startTime[2] >= endTime[2])) {
			return -1;
	} else {
		var totalTime = (endTime[0] - startTime[0])*60*60  + (endTime[1] - startTime[1])*60 + (endTime[2] - startTime[2]);
		return totalTime;
	}
}
// function to clear the fields
function clearFields(){
	elByID("title").value = "";
	elByID("description").value = "";
	elByID("meetingDate").value = "";
	elByID("startTime").value = "";
	elByID("endTime").value = "";
}

// function to dynamically create the meeting invite
// and display it on the right side
function createMeetingEvent(){	
	var para = document.createElement("P");
	para.id = "meetingID" + (length + 1);
    para.class = "sidebar";
	var breakTag1 = document.createElement('br');
	var breakTag2 = document.createElement('br');
	var breakTag3 = document.createElement('br');
	var breakTag4 = document.createElement('br');
	var breakTag5 = document.createElement('br');
	var breakTag6 = document.createElement('br');
	var title = document.createTextNode("Title: " + elByID("title").value);
	var description = document.createTextNode("Description: " + elByID("description").value);
	var meetingDate = document.createTextNode("Meeting Date: " + elByID("meetingDate").value);
	var startTime = document.createTextNode("Start Time: " + elByID("startTime").value);
	var endTime = document.createTextNode("End Time: " + elByID("endTime").value);
    para.appendChild(title);para.appendChild(breakTag1);
	para.appendChild(description);para.appendChild(breakTag2);
	para.appendChild(meetingDate);para.appendChild(breakTag3);
	para.appendChild(startTime);para.appendChild(breakTag4);
	para.appendChild(endTime);para.appendChild(breakTag5);
	para.style.width = "200px";
	para.style.height = "120px";
	para.style.background = "#77a4d4";
	para.style.borderStyle = "solid";
	para.style.borderWidth = "1px";
	para.style.padding = "2px 2px 2px 2px";
	elByID("meetingEventList").appendChild(para);
	elByID("meetingEventList").appendChild(breakTag6);
}