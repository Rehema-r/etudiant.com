document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // AI Assistant
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = userInput.value.trim();
            if (message) {
                appendMessage('user', message);
                userInput.value = '';

                // Simulate AI response
                setTimeout(() => {
                    const aiResponse = generateAIResponse(message);
                    appendMessage('ai', aiResponse);
                }, 1000);
            }
        });
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(query) {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('math')) return "Les mathématiques sont passionnantes ! Avez-vous besoin d'aide avec l'algèbre ou l'analyse ?";
        if (lowerQuery.includes('science') || lowerQuery.includes('physique')) return "La science nous permet de comprendre l'univers. Je peux vous expliquer les lois de Newton si vous voulez.";
        if (lowerQuery.includes('examen')) return "Pour réussir vos examens, je vous conseille de réviser régulièrement et de pratiquer sur d'anciens sujets.";
        if (lowerQuery.includes('bonjour') || lowerQuery.includes('salut')) return "Bonjour ! Comment se passent vos révisions aujourd'hui ?";
        return "C'est une excellente question. En tant qu'IA Expert, je vous suggère d'approfondir ce sujet dans la section Ressources.";
    }

    // Study Planner
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                newTaskInput.value = '';
            }
        });
    }

    function addTask(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-btn">Supprimer</button>
        `;

        li.querySelector('span').addEventListener('click', function() {
            this.classList.toggle('completed');
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });

        taskList.appendChild(li);
    }
});
