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

    // AI Assistant v2 - Advanced Knowledge Base
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

                // Simulate AI Thinking
                setTimeout(() => {
                    const aiResponse = generateAdvancedAIResponse(message);
                    appendMessage('ai', aiResponse);
                }, 800);
            }
        });
    }

    // Search Logic
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.course-card');

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // File Upload Simulation
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                alert(`Document "${e.target.files[0].name}" téléchargé avec succès dans votre bibliothèque !`);
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

    function generateAdvancedAIResponse(query) {
        const q = query.toLowerCase();

        // Complex Languages
        if (q.includes('rust') && q.includes('borrow')) {
            return "Le 'Borrow Checker' de Rust est le système qui gère la sécurité mémoire. Il impose deux règles : soit vous avez une référence mutable unique, soit plusieurs références immuables. Cela empêche les 'data races' à la compilation.";
        }
        if (q.includes('c++') && (q.includes('pointeur') || q.includes('smart'))) {
            return "En C++ moderne, utilisez les 'smart pointers' comme std::unique_ptr ou std::shared_ptr pour éviter les fuites de mémoire. Ils gèrent automatiquement la libération des ressources via le RAII.";
        }
        if (q.includes('go') || q.includes('concurrence')) {
            return "Go utilise des 'Goroutines' et des 'Channels'. Les Goroutines sont des threads légers gérés par le runtime Go, et les Channels permettent de communiquer entre elles de manière sécurisée.";
        }

        // Advanced Math
        if (q.includes('matrice') || q.includes('diagonalisation')) {
            return "La diagonalisation d'une matrice consiste à trouver une base de vecteurs propres. Une matrice carrée A est diagonalisable s'il existe une matrice inversible P telle que P⁻¹AP soit une matrice diagonale.";
        }
        if (q.includes('quantique')) {
            return "La physique quantique repose sur le principe de superposition (un système peut être dans plusieurs états à la fois) et l'intrication (deux particules partagent le même état quelle que soit la distance).";
        }

        // General Platform / Academic
        if (q.includes('examen') || q.includes('révision')) {
            return "Pour vos cours de programmation système (C++, Rust), je vous suggère de pratiquer l'implémentation d'algorithmes de tri ou de structures de données comme les arbres binaires.";
        }

        return "C'est une question technique intéressante. Concernant " + query + ", je vous recommande de consulter les modules détaillés dans la section 'Mes Cours' ou les docs officielles dans 'Ressources'.";
    }

    // Community Forum Logic
    const submitPostBtn = document.getElementById('submit-post');
    const postTextArea = document.getElementById('post-text');
    const forumFeed = document.getElementById('forum-feed');

    if (submitPostBtn) {
        submitPostBtn.addEventListener('click', () => {
            const content = postTextArea.value.trim();
            if (content) {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <strong>Vous</strong>: "${content}"
                    <div class="post-meta">À l'instant</div>
                `;
                forumFeed.prepend(postDiv);
                postTextArea.value = '';
            }
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Logout
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
                alert('Déconnexion réussie.');
            }
        });
    });

    // Planner Logic
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                const li = document.createElement('li');
                li.innerHTML = `<span>${taskText}</span> <button class="delete-btn">Supprimer</button>`;
                li.querySelector('span').addEventListener('click', function() { this.classList.toggle('completed'); });
                li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
                taskList.appendChild(li);
                newTaskInput.value = '';
            }
        });
    }
});
