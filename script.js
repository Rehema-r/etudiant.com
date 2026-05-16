document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Header Clock & Date
    function updateHeaderTime() {
        const now = new Date();
        const timeElem = document.getElementById('current-time');
        const dateElem = document.getElementById('current-date');

        if (timeElem) timeElem.textContent = now.toLocaleTimeString('fr-FR');
        if (dateElem) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElem.textContent = now.toLocaleDateString('fr-FR', options);
        }
    }
    setInterval(updateHeaderTime, 1000);
    updateHeaderTime();

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
                    // Reset sub-views if necessary
                    if (targetId === 'courses') {
                        const courseListView = document.getElementById('course-list-view');
                        const courseDetailView = document.getElementById('course-detail-view');
                        if (courseListView && courseDetailView) {
                            courseListView.style.display = 'block';
                            courseDetailView.style.display = 'none';
                        }
                    }
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

                // Enhanced AI Thinking State
                const thinkingDiv = document.createElement('div');
                thinkingDiv.className = 'message ai thinking';
                thinkingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> L\'IA analyse les modules de cours...';
                chatMessages.appendChild(thinkingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(() => {
                    thinkingDiv.remove();
                    const aiResponse = generateAdvancedAIResponse(message);
                    appendMessage('ai', aiResponse);
                    updateExpertPoints(20); // Reward for using AI
                }, 1500);
            }
        });
    }

    // Voice Room Logic
    const joinVoiceBtn = document.getElementById('join-voice');
    if (joinVoiceBtn) {
        joinVoiceBtn.addEventListener('click', () => {
            joinVoiceBtn.classList.toggle('active');
            if (joinVoiceBtn.classList.contains('active')) {
                joinVoiceBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Quitter le salon';
                alert('Vous avez rejoint le salon vocal d\'étude.');
            } else {
                joinVoiceBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Rejoindre';
                alert('Vous avez quitté le salon vocal.');
            }
        });
    }

    // Course Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');

            const cards = document.querySelectorAll('.course-card');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Course Detail Logic
    let courseCards = document.querySelectorAll('.course-card');
    const courseListView = document.getElementById('course-list-view');
    const courseDetailView = document.getElementById('course-detail-view');
    const backBtn = document.getElementById('back-to-courses');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');

    function initCourseClick() {
        courseCards = document.querySelectorAll('.course-card');
        if (courseCards.length > 0 && courseListView && courseDetailView) {
            courseCards.forEach(card => {
                // Remove old listener if any
                card.removeEventListener('click', handleCourseClick);
                card.addEventListener('click', handleCourseClick);
            });
        }
    }

    function handleCourseClick(e) {
        const card = e.currentTarget;
        const title = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;

        detailTitle.textContent = title;
        detailDesc.textContent = desc;

        courseListView.style.display = 'none';
        courseDetailView.style.display = 'block';
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            courseDetailView.style.display = 'none';
            courseListView.style.display = 'block';
        });
    }

    initCourseClick();

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

        // Simulation of RAG (Retrieval Augmented Generation)
        const retrievalMsg = "[Système RAG : Recherche dans les documents de cours (C++, Rust, Math)...]";
        console.log(retrievalMsg);

        // Complex Languages
        if (q.includes('rust') && q.includes('borrow')) {
            return "D'après le manuel 'The Rust Programming Language' (Module 2), le 'Borrow Checker' est le garant de la sécurité mémoire. Il valide que les références ne survivent pas aux données qu'elles pointent et impose l'exclusivité des accès mutables. Cela élimine les bugs de segmentation fréquents en C++.";
        }
        if (q.includes('c++') && (q.includes('pointeur') || q.includes('smart'))) {
            return "En C++ moderne, utilisez les 'smart pointers' comme std::unique_ptr ou std::shared_ptr pour éviter les fuites de mémoire. Ils gèrent automatiquement la libération des ressources via le RAII.";
        }
        if (q.includes('go') || q.includes('concurrence')) {
            return "Go utilise des 'Goroutines' et des 'Channels'. Les Goroutines sont des threads légers gérés par le runtime Go, et les Channels permettent de communiquer entre elles de manière sécurisée.";
        }

        // Advanced Math
        if (q.includes('matrice') || q.includes('diagonalisation')) {
            return "En me référant au cours d'Algèbre Linéaire (Chapitre 4), la diagonalisation d'une matrice A consiste à la décomposer en PDP⁻¹. Cela n'est possible que si A possède n vecteurs propres linéairement indépendants. Pour les matrices non carrées, on utilise la SVD (Singular Value Decomposition).";
        }
        if (q.includes('quantique')) {
            return "La physique quantique repose sur le principe de superposition (un système peut être dans plusieurs états à la fois) et l'intrication (deux particules partagent le même état quelle que soit la distance).";
        }

        // Library IA Integration
        if (q.includes('livre') || q.includes('bibliothèque')) {
            return "Notre bibliothèque mondiale contient des classiques et des ouvrages techniques. Je vous conseille de lire 'Algorithms' de Jeff Erickson ou 'Clean Code' pour progresser en ingénierie.";
        }
        if (q.includes('gutenberg') || q.includes('open library')) {
            return "Nous intégrons des ressources de Project Gutenberg et Open Library pour vous offrir un accès gratuit et légal à des milliers d'ouvrages académiques.";
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
                addLikeButton(postDiv);
                updateExpertPoints(30); // Reward for community contribution
            }
        });
    }

    // Initial likes for existing posts
    document.querySelectorAll('.post').forEach(post => addLikeButton(post));

    function addLikeButton(postDiv) {
        const btn = document.createElement('button');
        btn.innerHTML = '<i class="far fa-thumbs-up"></i> Utile';
        btn.className = 'like-btn';
        btn.style.cssText = 'background:none; border:none; color:var(--accent-color); cursor:pointer; font-size:0.8rem; margin-top:5px;';
        btn.onclick = () => {
            btn.innerHTML = '<i class="fas fa-thumbs-up"></i> Liké';
            btn.style.fontWeight = 'bold';
        };
        postDiv.appendChild(btn);
    }

    // Theme Toggle & Persistence
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle?.querySelector('i');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Profile Update Logic
    const profileForm = document.getElementById('profile-form');
    const editName = document.getElementById('edit-name');
    const editBio = document.getElementById('edit-bio');
    const displayName = document.getElementById('user-name');
    const profileRole = document.querySelector('.profile-text p');

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = editName.value;
            const newBio = editBio.value;

            displayName.textContent = newName;
            profileRole.textContent = newBio;

            // Sync with sidebar
            const sidebarName = document.querySelector('.sidebar-footer ins');
            if (sidebarName) sidebarName.textContent = newName;

            alert('Profil mis à jour avec succès !');
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

    // Notifications Dropdown
    const notifBtn = document.getElementById('notif-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    const markAllBtn = document.getElementById('mark-all-read');
    const notifBadge = document.querySelector('.notif-badge');

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.style.display = notifDropdown.style.display === 'block' ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
            notifDropdown.style.display = 'none';
        });
        notifDropdown.addEventListener('click', (e) => e.stopPropagation());
    }

    if (markAllBtn) {
        markAllBtn.addEventListener('click', () => {
            if (notifBadge) {
                notifBadge.textContent = '0';
                notifBadge.style.display = 'none';
            }
            alert('Toutes les notifications ont été marquées comme lues.');
        });
    }

    // Global Library Logic
    const librarySearch = document.getElementById('library-search-input');
    const libraryGrid = id => document.getElementById(id); // helper for cleaner code

    if (librarySearch) {
        librarySearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const bookCards = document.querySelectorAll('.book-card');

            bookCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const author = card.getAttribute('data-author').toLowerCase();
                if (title.includes(term) || author.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Reading System
    const readingView = document.getElementById('reading-view');
    const closeReader = document.getElementById('close-reader');
    const markFinishedBtn = document.getElementById('mark-finished');
    const progressSlider = document.getElementById('reading-progress-slider');
    const progressText = document.getElementById('progress-percentage');
    const readingTitle = document.getElementById('reading-book-title');

    document.querySelectorAll('.btn-read').forEach(btn => {
        btn.addEventListener('click', () => {
            const bookName = btn.getAttribute('data-book');
            const bookUrl = btn.getAttribute('data-url');
            readingTitle.textContent = `Lecture : ${bookName}`;
            readingView.style.display = 'flex';
            progressSlider.value = 0;
            progressText.textContent = '0%';

            // Load saved notes for this book
            const savedNotes = localStorage.getItem(`notes_${bookName}`);
            const notesArea = document.getElementById('reading-notes');
            if (notesArea) notesArea.value = savedNotes || '';

            // In a real app, we would load the URL in an iframe or redirect.
            // For this prototype, we'll log it and show the simulated reader.
            console.log(`Chargement de la source externe : ${bookUrl}`);
        });
    });

    if (closeReader) {
        closeReader.addEventListener('click', () => {
            readingView.style.display = 'none';
        });
    }

    if (progressSlider) {
        progressSlider.addEventListener('input', (e) => {
            progressText.textContent = `${e.target.value}%`;
        });
    }

    if (markFinishedBtn) {
        markFinishedBtn.addEventListener('click', () => {
            const bookName = readingTitle.textContent.replace('Lecture : ', '');
            const notesArea = document.getElementById('reading-notes');
            if (notesArea) {
                localStorage.setItem(`notes_${bookName}`, notesArea.value);
            }

            alert('Félicitations ! Vous avez terminé ce livre. +150 points d\'expertise.');
            updateExpertPoints(150);
            updateBooksReadCount();
            updateAcademicAvg(0.2); // Knowledge from books improves average
            readingView.style.display = 'none';
        });
    }

    // Save notes while typing (optional auto-save)
    const notesArea = document.getElementById('reading-notes');
    if (notesArea) {
        notesArea.addEventListener('blur', () => {
            const bookName = readingTitle.textContent.replace('Lecture : ', '');
            localStorage.setItem(`notes_${bookName}`, notesArea.value);
        });
    }

    function updateBooksReadCount() {
        const countElem = document.getElementById('books-read-count');
        if (countElem) {
            let count = parseInt(countElem.textContent);
            count++;
            countElem.textContent = count;
        }
    }

    // IA Summary Logic
    document.querySelectorAll('.btn-ai-summary').forEach(btn => {
        btn.addEventListener('click', () => {
            const bookName = btn.getAttribute('data-book');
            const summary = generateBookSummary(bookName);
            alert(`Résumé IA pour "${bookName}" :\n\n${summary}`);
        });
    });

    function generateBookSummary(book) {
        const summaries = {
            'Algorithms': 'Un guide complet sur la conception et l\'analyse des algorithmes, couvrant le tri, les graphes et la programmation dynamique.',
            'The Great Gatsby': 'Un classique de la littérature américaine explorant les thèmes de la décadence, de l\'idéalisme et du changement social dans les années 1920.',
            'Clean Code': 'Un manuel essentiel pour les développeurs souhaitant écrire du code lisible, maintenable et efficace.',
            'Calculus Made Easy': 'Une introduction simplifiée et intuitive au calcul différentiel et intégral, rendant les mathématiques complexes accessibles.'
        };
        return summaries[book] || "Résumé non disponible pour le moment. L'IA analyse encore cet ouvrage.";
    }

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
                li.querySelector('span').addEventListener('click', function() {
                    this.classList.toggle('completed');
                    if (this.classList.contains('completed')) {
                        updateExpertPoints(50);
                    } else {
                        updateExpertPoints(-50);
                    }
                });
                li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
                taskList.appendChild(li);
                newTaskInput.value = '';
            }
        });
    }

    function updateExpertPoints(amount) {
        const pointsElem = document.getElementById('expert-points');
        const lbXpElem = document.getElementById('user-xp-lb');
        if (pointsElem) {
            let currentValue = pointsElem.textContent.replace(/,/g, '');
            let currentPoints = parseInt(currentValue);
            currentPoints += amount;
            pointsElem.textContent = currentPoints.toLocaleString();

            if (lbXpElem) lbXpElem.textContent = `${currentPoints.toLocaleString()} XP`;

            updateLevel(currentPoints);
        }
    }

    function updateLevel(points) {
        const level = Math.floor(points / 500) + 1;
        const welcomeCardH2 = document.querySelector('.welcome-card h2');
        if (welcomeCardH2) {
            const name = document.getElementById('user-name').textContent.split(' ')[0];
            welcomeCardH2.innerHTML = `Bonjour, ${name} ! <span class="level-badge">Niveau ${level}</span>`;
        }
        checkBadgeUnlocks(level, points);
    }

    function checkBadgeUnlocks(level, points) {
        // Unlock Rust Badge at Level 4
        const badgeRust = document.getElementById('badge-rust');
        if (badgeRust && level >= 4) {
            unlockBadge(badgeRust, "Apprenti Rust", "fas fa-medal");
        }

        // Unlock Library Badge if 5 books read (simulated check)
        const booksRead = parseInt(document.getElementById('books-read-count')?.textContent || "0");
        const badgeLibrary = document.getElementById('badge-library');
        if (badgeLibrary && booksRead >= 5) {
            unlockBadge(badgeLibrary, "Lecteur Assidu", "fas fa-book-open");
        }
    }

    function unlockBadge(badgeElem, text, iconClass) {
        if (badgeElem.classList.contains('locked')) {
            badgeElem.classList.remove('locked');
            badgeElem.classList.add('unlocked');
            badgeElem.innerHTML = `<i class="${iconClass}"></i> ${text}`;
            badgeElem.title = "Débloqué !";
            console.log(`Badge débloqué : ${text}`);
            // Show notification
            addNotification(`Félicitations ! Vous avez débloqué le badge : <strong>${text}</strong>`);
        }
    }

    function addNotification(message) {
        const notifList = document.getElementById('notif-list');
        const notifBadge = document.querySelector('.notif-badge');
        if (notifList) {
            const p = document.createElement('p');
            p.className = 'notif-item';
            p.innerHTML = message;
            notifList.prepend(p);

            if (notifBadge) {
                let count = parseInt(notifBadge.textContent);
                notifBadge.textContent = count + 1;
                notifBadge.style.display = 'block';
            }
        }
    }

    // Pomodoro Timer Logic
    let pomoInterval;
    let pomoTime = 25 * 60;
    let isWorkSession = true;
    const pomoDisplay = document.getElementById('pomodoro-timer');
    const pomoStatus = document.getElementById('pomo-status');

    function updatePomoDisplay() {
        const mins = Math.floor(pomoTime / 60);
        const secs = pomoTime % 60;
        if (pomoDisplay) pomoDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    const startPomoBtn = document.getElementById('start-pomo');
    const pausePomoBtn = document.getElementById('pause-pomo');
    const resetPomoBtn = document.getElementById('reset-pomo');

    if (startPomoBtn) {
        startPomoBtn.addEventListener('click', () => {
            if (!pomoInterval) {
                pomoInterval = setInterval(() => {
                    pomoTime--;
                    updatePomoDisplay();
                    if (pomoTime <= 0) {
                        clearInterval(pomoInterval);
                        pomoInterval = null;
                        if (isWorkSession) {
                            alert("Session terminée ! Prenez une pause.");
                            updateExpertPoints(200);
                            pomoTime = 5 * 60;
                            isWorkSession = false;
                            pomoStatus.textContent = "Pause bien méritée";
                        } else {
                            alert("La pause est finie, au travail !");
                            pomoTime = 25 * 60;
                            isWorkSession = true;
                            pomoStatus.textContent = "Session d'étude";
                        }
                        updatePomoDisplay();
                    }
                }, 1000);
            }
        });
    }

    if (pausePomoBtn) {
        pausePomoBtn.addEventListener('click', () => {
            clearInterval(pomoInterval);
            pomoInterval = null;
        });
    }

    if (resetPomoBtn) {
        resetPomoBtn.addEventListener('click', () => {
            clearInterval(pomoInterval);
            pomoInterval = null;
            pomoTime = 25 * 60;
            isWorkSession = true;
            pomoStatus.textContent = "Session d'étude";
            updatePomoDisplay();
        });
    }

    // Playground Logic
    const runCodeBtn = document.getElementById('run-code');
    const codeEditor = document.getElementById('code-editor');
    const terminalOutput = document.getElementById('terminal-output');
    const playgroundLang = document.getElementById('playground-lang');

    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', () => {
            const lang = playgroundLang.value;
            const code = codeEditor.value.trim();

            terminalOutput.innerHTML = "> Compilation en cours...<br>> Liaison des bibliothèques...";

            setTimeout(() => {
                if (!code) {
                    terminalOutput.innerHTML = "<span style='color:var(--danger-color)'>> Erreur : Aucun code à exécuter.</span>";
                    return;
                }

                let output = "";
                if (lang === 'cpp') {
                    output = "> [C++ Output] Hello World Expert!<br>> Programmation système détectée.<br>> Mémoire allouée : 4KB";
                } else if (lang === 'rust') {
                    output = "> [Rust Output] Compilation réussie (Safe Memory).<br>> Cargo check : OK.<br>> Résultat : 42";
                } else {
                    output = "> [Python Output] Script exécuté avec succès.<br>> Analyse Big Data terminée.";
                }

                terminalOutput.innerHTML = output;
                updateExpertPoints(15);
            }, 1000);
        });
    }

    // Resource Search Logic
    const resourceSearch = document.getElementById('resource-search');
    if (resourceSearch) {
        resourceSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const categories = document.querySelectorAll('.resource-category');

            categories.forEach(cat => {
                const links = cat.querySelectorAll('li');
                let catVisible = false;
                links.forEach(link => {
                    if (link.textContent.toLowerCase().includes(term)) {
                        link.style.display = 'block';
                        catVisible = true;
                    } else {
                        link.style.display = 'none';
                    }
                });
                cat.style.display = catVisible ? 'block' : 'none';
            });
        });
    }

    // Initial Level check
    const initialPoints = parseInt(document.getElementById('expert-points').textContent.replace(/,/g, ''));
    updateLevel(initialPoints);

    // Quiz Logic
    const startQuizBtn = document.getElementById('start-quiz');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            const response = confirm("Question : Le C++ est-il un langage à typage statique ?\n\n(OK pour OUI, Annuler pour NON)");
            if (response) {
                alert("Bravo ! +100 points d'expertise.");
                updateExpertPoints(100);
                updateAcademicAvg(0.1);
            } else {
                alert("Dommage, la réponse était OUI.");
                updateAcademicAvg(-0.05);
            }
        });
    }

    function updateAcademicAvg(amount) {
        const avgElem = document.getElementById('academic-avg');
        if (avgElem) {
            let current = parseFloat(avgElem.textContent);
            current = Math.min(20, Math.max(0, current + amount));
            avgElem.textContent = current.toFixed(1);
        }
    }

    // Simulate study hours increment
    setInterval(() => {
        const hoursElem = document.getElementById('study-hours');
        if (hoursElem && Math.random() > 0.95) {
            let hours = parseInt(hoursElem.textContent);
            hours++;
            hoursElem.textContent = hours;
        }
    }, 5000);
});
