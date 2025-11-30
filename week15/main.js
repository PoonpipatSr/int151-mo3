const addBtn = document.getElementById('addBtn');
const dataInput = document.getElementById('dataInput');
const timeInput = document.getElementById('timeInput');
const dataList = document.getElementById('dataList');

addBtn.addEventListener('click', function() {
    const text = dataInput.value;
    const time = timeInput.value;

    if (text === '' || time === '') {
        alert("กรุณากรอกข้อมูลและเลือกเวลาให้ครบถ้วน");
        return;
    }

    if (time >= "08:00" && time <= "18:00") {
        
        const li = document.createElement('li');
        li.innerText = `เวลา ${time} น. : ${text}`;
        dataList.appendChild(li);

        dataInput.value = '';
        timeInput.value = '';

    } else {
        alert("ไม่สามารถเพิ่มข้อมูลได้!\nระบบอนุญาตเฉพาะเวลา 08:00 ถึง 18:00 น. เท่านั้น");
    }
});