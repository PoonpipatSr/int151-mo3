const wait = (ms) => new Promise(r => setTimeout(r, ms));


/* =================================================================
   ข้อ 1: ระบบ Login (Sequential Flow)
   คอนเซปต์: ต้องทำทีละอย่าง ห้ามข้ามขั้นตอน (เจอ User ก่อน -> ถึงเช็ค Pass ได้)
   ================================================================= */

async function checkUser(user) {
    await wait(500);
    if (user !== "admin") throw new Error("User not found");
    return "User Found";
}

async function checkPass(pass) {
    await wait(500);
    if (pass !== "1234") throw new Error("Wrong Password");
    return "Password Correct";
}

async function loginSystem(username, password) {
    console.log(`[Login System] logging in: ${username}`);
    try {
        await checkUser(username);
        console.log(" - User check passed");

        await checkPass(password);
        console.log(" - Password check passed");

        console.log("Login Success");

    } catch (error) {
        console.log("Login Failed:", error.message);
    }
}

loginSystem("admin", "wrongpass");


/* =================================================================
   ข้อ 2: ดึงข้อมูลหน้าเว็บ (Parallel Flow)
   คอนเซปต์: ข้อมูล 2 อย่างที่ไม่เกี่ยวข้องกัน ควรดึงพร้อมกันเพื่อความเร็ว
   ================================================================= */

async function getNews() {
    await wait(2000); 
    return "News Data";
}

async function getWeather() {
    await wait(2000); 
    return "Weather Data";
}

async function loadHomePage() {
    console.log("\n[Home Page] Loading content...");
    console.time("LoadTime"); 

    const [news, weather] = await Promise.all([
        getNews(),
        getWeather()
    ]);

    console.log(" - News:", news);
    console.log(" - Weather:", weather);
    
    console.timeEnd("LoadTime"); 
}

loadHomePage();


/* =================================================================
   ข้อ 3: เสี่ยงดวงเปิดกล่อง (Logic Branching with Error)
   คอนเซปต์: ใช้ try/catch เพื่อแยก "ผลลัพธ์ปกติ" กับ "ผลลัพธ์ล้มเหลว"
   ================================================================= */

async function openBox() {
    await wait(500);
    const chance = Math.random(); 
    
    if (chance > 0.5) {
        return "Rare Item"; 
    } else {
        throw new Error("Nothing inside"); 
    }
}

async function playGame() {
    console.log("\n[Game] Opening box...");
    try {
        const item = await openBox();
        console.log("You received:", item);

    } catch (err) {
        console.log("Box failed:", err.message);
    }
}

playGame();


/* =================================================================
   ข้อ 4: ตรวจสอบก่อนส่ง (Validation / Early Return)
   คอนเซปต์: อย่าเสียเวลาเรียก Server ถ้าข้อมูลขาเข้ายังไม่ถูกต้อง
   ================================================================= */

async function sendApi(text) {
    await wait(1000);
    console.log("Server received:", text);
}

async function chat(message) {
    console.log(`\n[Chat] Sending: "${message}"`);

    if (message === "") {
        console.log("Error: Message cannot be empty");
        
        return; 
    }

    console.log("Sending message...");
    await sendApi(message);
    console.log("Sent done.");
}

chat(""); 
