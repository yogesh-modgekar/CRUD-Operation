
let studentForm = document.querySelector("#student-form");

let studentList = document.querySelector("#student-list");

let clearData = document.querySelector("#clearData");

studentForm.addEventListener("submit", (e) => {

   let studentName = e.target.studentName.value;
   let studentUId = e.target.studentUId.value;
   let studentEmail = e.target.studentEmail.value;
   let studentContact = e.target.studentContact.value;

   let userData = JSON.parse(localStorage.getItem("userDetails")) ?? []
    
      userData.push({
         'studentName': studentName,
         'studentUId': studentUId,
         'studentEmail': studentEmail,
         'studentContact': studentContact
      })
      localStorage.setItem("userDetails", JSON.stringify(userData));
      e.target.reset();
      
      displayData();
      e.preventDefault();

})

// Logic for Display table data
let displayData = () => {
   let userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
   let finalData = '';
   userData.forEach((element, i) => {
      finalData += ` <tr>
                        <td  class="py-3 px-6">${element.studentName}</td>
                        <td  class="py-3 px-6">${element.studentUId}</td>
                        <td  class="py-3 px-6">${element.studentEmail}</td>
                        <td  class="py-3 px-6">${element.studentContact}</td>
                        <td  class="py-3 px-6">
                          
                             <a href="#" onclick='removeData(${i})'><i class='bx bx-message-x text-red-600 text-2xl px-1' ></i></a>
                             <a href="#" onclick='editData(${i})'><i class='bx bxs-edit text-yellow-400 text-2xl px-1 mx-1'></i></a>
                        </td>
                      </tr> `
   });
   studentList.innerHTML = finalData;
}

//Logic for Removing data from table
let removeData = (i) => {
   let userData = JSON.parse(localStorage.getItem("userDetails"));
   userData.splice(i, 1);
   localStorage.setItem("userDetails", JSON.stringify(userData));
   displayData();
}

// Logic for Clear all data
clearData.addEventListener("click",()=>{
   localStorage.clear("userDetails");
   displayData();
})

// Logic for Editing data from table
let editData = (i)=>{
   let userData = JSON.parse(localStorage.getItem("userDetails"));

   document.querySelector("#studentName").value = userData[i].studentName; 
   document.querySelector("#studentUId").value = userData[i].studentUId; 
   document.querySelector("#studentEmail").value = userData[i].studentEmail; 
   document.querySelector("#studentContact").value = userData[i].studentContact; 

   // Logic for Updating Data
   let update = (i)=>{
   let studentName = document.querySelector("#studentName").value;
   let studentUId = document.querySelector("#studentUId").value;
   let studentEmail = document.querySelector("#studentEmail").value;
   let studentContact = document.querySelector("#studentContact").value;

   userData.splice(i,1,{studentName:studentName, studentUId:studentUId, studentEmail:studentEmail, studentContact:studentContact});

   localStorage.setItem("userDetails", JSON.stringify(userData));
   }
   update();
   
}

displayData();
