const commands = [

    {
        name: "pwd",
        category: "basic",
        description: "يعرض المسار الحالي الذي تعمل بداخله.",
        example: "pwd"
    },

    {
        name: "ls",
        category: "files",
        description: "يعرض الملفات والمجلدات الموجودة في المكان الحالي.",
        example: "ls -la"
    },

    {
        name: "cd",
        category: "files",
        description: "يستخدم للانتقال بين المجلدات.",
        example: "cd Documents"
    },

    {
        name: "mkdir",
        category: "files",
        description: "ينشئ مجلدًا جديدًا.",
        example: "mkdir project"
    },

    {
        name: "cp",
        category: "files",
        description: "ينسخ الملفات أو المجلدات.",
        example: "cp file.txt backup.txt"
    },

    {
        name: "mv",
        category: "files",
        description: "ينقل ملفًا أو يغيّر اسمه.",
        example: "mv old.txt new.txt"
    },

    {
        name: "ip",
        category: "network",
        description: "يعرض معلومات واجهات الشبكة وعناوين IP.",
        example: "ip addr"
    },

    {
        name: "ping",
        category: "network",
        description: "يختبر إمكانية الوصول إلى جهاز عبر الشبكة.",
        example: "ping 127.0.0.1"
    },

    {
        name: "ss",
        category: "network",
        description: "يعرض اتصالات ومنافذ الشبكة على جهازك.",
        example: "ss -tuln"
    },

    {
        name: "nmap",
        category: "security",
        description: "أداة لاستكشاف الشبكات والخدمات. استخدمها فقط على الأنظمة التي تملك تصريحًا لاختبارها.",
        example: "nmap 127.0.0.1"
    },

    {
        name: "whois",
        category: "osint",
        description: "يعرض معلومات WHOIS المتاحة علنًا عن نطاق.",
        example: "whois example.com"
    }

];


const container = document.getElementById("commands");
const search = document.getElementById("search");

let currentCategory = "all";


function renderCommands() {

    const query = search.value.toLowerCase().trim();

    const filtered = commands.filter(command => {

        const matchesCategory =
            currentCategory === "all" ||
            command.category === currentCategory;

        const matchesSearch =
            command.name.toLowerCase().includes(query) ||
            command.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });


    container.innerHTML = "";


    if (filtered.length === 0) {

        container.innerHTML = `
            <p>لم يتم العثور على الأمر.</p>
        `;

        return;
    }


    filtered.forEach(command => {

        const card = document.createElement("article");

        card.className = "command-card";

        card.innerHTML = `
            <h2>${command.name}</h2>

            <p>
                ${command.description}
            </p>

            <code class="command">
                ${command.example}
            </code>

            <span class="tag">
                ${command.category}
            </span>
        `;

        container.appendChild(card);

    });
}


document.querySelectorAll(".categories button")
    .forEach(button => {

        button.addEventListener("click", () => {

            currentCategory =
                button.dataset.category;

            renderCommands();

        });

    });


search.addEventListener("input", renderCommands);


renderCommands();
