import { getItems, deleteItem } from "./myLib/fetchUtils.js";

const API_URL = import.meta.env.VITE_APP_URL;
const STUDY_PLANS_ENDPOINT = `${API_URL}/study-plans`;

const tbody = document.querySelector("#studyplan");

function showDialogError(messageText) {
  const dialog = document.createElement("dialog");
  dialog.className = "ecors-dialog rounded-2xl mx-auto mt-20 w-full max-w-md bg-white p-6 shadow-2xl backdrop:bg-gray-500/50";
  
  const msgElement = document.createElement("p");
  msgElement.className = "text-sm text-red-700 font-semibold";
  msgElement.textContent = messageText;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.className = "mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm";
  closeBtn.onclick = () => dialog.close();

  dialog.append(msgElement, closeBtn);
  document.body.appendChild(dialog);
  dialog.showModal();
}

async function loadStudyPlans() {
  try {
    const rows = await getItems(STUDY_PLANS_ENDPOINT);

    tbody.innerHTML = "";

    if (!rows || rows.length === 0) {
      const nodata_tr = document.createElement("tr");
      nodata_tr.innerHTML = `<td colspan="5" class="px-4 py-3 text-center text-gray-500">No data available</td>`;
      tbody.appendChild(nodata_tr);
      return;
    }

    rows.forEach((row) => {
      const trElement = document.createElement("tr");
      trElement.className = "ecors-row hover:bg-gray-50 transition-colors border-b";

      const createCell = (text, className = "") => {
        const td = document.createElement("td");
        td.className = `px-4 py-3 ${className}`;
        td.textContent = text;
        return td;
      };

      trElement.append(
        createCell(row.id, "ecors-id"),
        createCell(row.study_code, "ecors-planCode font-medium"),
        createCell(row.english_name, "ecors-nameEng"),  
        createCell(row.thai_name, "ecors-nameTh")         
      );

      tbody.appendChild(trElement);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    showDialogError("There is a problem loading data. Please try again later.");
  }
}

loadStudyPlans();