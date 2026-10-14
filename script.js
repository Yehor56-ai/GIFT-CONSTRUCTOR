/**
 * GiftCraft — Gift Box Constructor Engine
 * Handles UI states, form validation, dynamic item matching, and gift box generation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const giftForm = document.getElementById('giftForm');
    const recipientSelect = document.getElementById('recipientSelect');
    const eventSelect = document.getElementById('eventSelect');
    const budgetInput = document.getElementById('budgetInput');
    const chipBtns = document.querySelectorAll('.chip-btn');

    const btnSubmit = document.getElementById('btnSubmit');
    const btnReset = document.getElementById('btnReset');
    const btnRegenerate = document.getElementById('btnRegenerate');

    // Error elements
    const errorBanner = document.getElementById('errorBanner');
    const errorMessage = document.getElementById('errorMessage');
    const groupRecipient = document.getElementById('groupRecipient');
    const groupEvent = document.getElementById('groupEvent');
    const groupBudget = document.getElementById('groupBudget');
    const recipientError = document.getElementById('recipientError');
    const eventError = document.getElementById('eventError');
    const budgetError = document.getElementById('budgetError');

    // Display State Containers
    const stateEmpty = document.getElementById('stateEmpty');
    const stateLoading = document.getElementById('stateLoading');
    const stateResult = document.getElementById('stateResult');

    // Result Card Elements
    const resultTag = document.getElementById('resultTag');
    const resultTitle = document.getElementById('resultTitle');
    const resultSubtitle = document.getElementById('resultSubtitle');
    const itemsCount = document.getElementById('itemsCount');
    const itemsList = document.getElementById('itemsList');
    const summaryTargetBudget = document.getElementById('summaryTargetBudget');
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');
    const summarySavings = document.getElementById('summarySavings');

    // --- Gift Knowledge Base ---
    const giftDatabase = {
        // Items tailored for "Him"
        him: [
            { name: "Шкіряний портмоне / гаманець", desc: "Преміальна натуральна шкіра ручної роботи", icon: "👛", baseWeight: 40 },
            { name: "Бездротові навушники TWS", desc: "Чітке звучання та шумозаглушення", icon: "🎧", baseWeight: 45 },
            { name: "Термокухоль з подвійними стінками", desc: "Зберігає тепло до 12 годин", icon: "☕", baseWeight: 20 },
            { name: "Крафтовий набір горіхів та сухофруктів", desc: "Добірний асорті-мікс в дерев'яному боксі", icon: "🥜", baseWeight: 15 },
            { name: "Подарунковий набір для догляду за бородою", desc: "Олія, бальзам та дерев'яний гребінець", icon: "🪮", baseWeight: 25 },
            { name: "Багатофункціональний мультитул", desc: "Нержавіюча сталь, 14 інструментів в одному", icon: "🛠️", baseWeight: 30 },
            { name: "Елітна парфумована вода (міні-формат)", desc: "Деревно-пряний насичений аромат", icon: "🧪", baseWeight: 35 },
            { name: "Шоколад з перцем чилі та сіллю", desc: "Крафтовий темний бельгійський шоколад", icon: "🍫", baseWeight: 10 }
        ],
        // Items tailored for "Her"
        her: [
            { name: "Ароматична свічка зі соєвого воску", desc: "Аромат ванілі, лаванди та пачулі", icon: "🕯️", baseWeight: 18 },
            { name: "Шовкова маска для сну та пов'язка", desc: "100% натуральний шовк mulberry", icon: "🎀", baseWeight: 22 },
            { name: "Набір органічної доглядової косметики", desc: "Скраб, зволожуючий крем та бальзам", icon: "🧴", baseWeight: 35 },
            { name: "Бездротова колонка в стилі ретро", desc: "Компактна з глибоким басом", icon: "📻", baseWeight: 40 },
            { name: "Колекційний трав'яний чай з бутонами квітів", desc: "Авторський купаж у скляній баночці", icon: "🫖", baseWeight: 15 },
            { name: "Елегантна скринька для прикрас", desc: "Оксамитове оздоблення з дзеркальцем", icon: "💎", baseWeight: 30 },
            { name: "Солодощі Макарон ручної роботи", desc: "Набір з 8 ніжних французьких тістечок", icon: "🧁", baseWeight: 18 },
            { name: "Плед крупної в'язки", desc: "Надзвичайно м'який та затишний", icon: "🧶", baseWeight: 35 }
        ],
        // Items tailored for "Child"
        child: [
            { name: "Інтерактивний конструктор", desc: "Розвиваючий набір для творчості", icon: "🧩", baseWeight: 35 },
            { name: "М'яка іграшка-обіймашка", desc: "Гіпоалергенна та надзвичайно приємна", icon: "🧸", baseWeight: 25 },
            { name: "Набір кольорових маркерів та арт-бук", desc: "50 яскравіших кольорів для малювання", icon: "🎨", baseWeight: 20 },
            { name: "Нічник-проектор зоряного неба", desc: "М'яке світло та 8 режимів світіння", icon: "🌌", baseWeight: 30 },
            { name: "Набір дитячих крафтових солодощів", desc: "Без цукру та штучних барвників", icon: "🍭", baseWeight: 15 },
            { name: "Настільна гра для всієї родини", desc: "Захоплюючі пригоди та веселощі", icon: "🎲", baseWeight: 30 }
        ],
        // Items tailored for "Colleague"
        colleague: [
            { name: "Стильний щоденник у твердій обкладинці", desc: "Датований планер з якісним папером", icon: "📓", baseWeight: 20 },
            { name: "Металева ручка Parker у футлярі", desc: "Класичний синій чорнильний стрижень", icon: "🖊️", baseWeight: 25 },
            { name: "Настільний зволожувач повітря з підсвіткою", desc: "Безшумний ультразвуковий спрей", icon: "💧", baseWeight: 28 },
            { name: "Спеціальна зернова кава Premium Arabica", desc: "Свіже обсмаження, нотки шоколаду", icon: "☕", baseWeight: 22 },
            { name: "Бездротова зарядка-підставка 3-в-1", desc: "Для смартфона, годинника та навушників", icon: "⚡", baseWeight: 45 },
            { name: "Стильний термопрес для напоїв", desc: "Компактна фляга-кухоль 500 мл", icon: "🥤", baseWeight: 25 }
        ],
        // Items tailored for "Parents"
        parents: [
            { name: "Набір елітних сортів меду з горішками", desc: "4 баночки акацієвого та гречаного меду", icon: "🍯", baseWeight: 22 },
            { name: "Затишний махровий парний комплект рушників", desc: "100% бавовна високої щільності", icon: "🧺", baseWeight: 30 },
            { name: "Електрочайник з терморегулятором", desc: "Скляний корпус із м'яким підсвічуванням", icon: "🫖", baseWeight: 40 },
            { name: "Набір затишних фарфорових чашок", desc: "Авторський розпис та позолота", icon: "☕", baseWeight: 25 },
            { name: "Масажер для шиї та плечей з прогрівом", desc: "Знімає втому та розслабляє м'язи", icon: "💆", baseWeight: 50 },
            { name: "Подарунковий кошик екзотичних фруктів", desc: "Свіжий манго, ананас, драгонфрут", icon: "🧺", baseWeight: 35 }
        ],
        // Items tailored for "Friend"
        friend: [
            { name: "Настільна гра для вечірок", desc: "Гарантія сміху та крутого вечора", icon: "🃏", baseWeight: 25 },
            { name: "Портативна bluetooth колонка", desc: "Захист від води IPX7 та потужний звук", icon: "🔊", baseWeight: 40 },
            { name: "Набір для вирощування еко-рослини", desc: "Горщик, ґрунт та насіння м'яти чи базиліку", icon: "🌱", baseWeight: 15 },
            { name: "Смішні брендові шкарпетки в баночці", desc: "3 пари з яскравими принтами", icon: "🧦", baseWeight: 12 },
            { name: "Набір маршмеллоу та гарячого шоколаду", desc: "Для затишних кіновечорів", icon: "☕", baseWeight: 15 },
            { name: "Постер зі 100 справами Scratch Off", desc: "Містить цікаві челенджі та ідеї", icon: "🗺️", baseWeight: 20 }
        ]
    };

    // Apply administrator edits saved in this browser.
    try {
        const savedGifts = JSON.parse(localStorage.getItem('giftmaster_admin_gifts') || '{}');
        Object.entries(savedGifts).forEach(([recipient, items]) => {
            if (Array.isArray(items)) giftDatabase[recipient] = items;
        });
    } catch (error) {
        console.warn('Не вдалося завантажити зміни адмін-панелі:', error);
    }

    // Generic mandatory packaging & card items
    const packagingItems = [
        { name: "Преміум подарункова коробка з бантом", desc: "Щільний дизайнерський картон та шовкова стрічка", icon: "🎁", price: 120 },
        { name: "Крафтова вітальна листівка", desc: "Персональний підпис за вашим побажанням", icon: "✉️", price: 40 }
    ];

    // Titles according to occasions
    const occasionTitles = {
        birthday: "«Святковий Вайб»",
        new_year: "«Різдвяне Диво»",
        anniversary: "«Романтичний Момент»",
        housewarming: "«Затишний Дім»",
        professional: "«Успіх та Натхнення»",
        just_because: "«Особлива Увага»"
    };

    // --- Event Handlers ---

    // Quick Budget Chips listener
    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = btn.getAttribute('data-budget');
            budgetInput.value = amount;
            
            // Highlight active chip
            chipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Clear budget error if present
            clearFieldError(groupBudget, budgetError);
            hideErrorBanner();
        });
    });

    // Clear field errors on input change
    recipientSelect.addEventListener('change', () => clearFieldError(groupRecipient, recipientError));
    eventSelect.addEventListener('change', () => clearFieldError(groupEvent, eventError));
    budgetInput.addEventListener('input', () => {
        clearFieldError(groupBudget, budgetError);
        // Deselect chips if custom value typed
        chipBtns.forEach(b => {
            if (b.getAttribute('data-budget') !== budgetInput.value) {
                b.classList.remove('active');
            }
        });
    });

    // Form Submit Listener
    giftForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate Form
        const isValid = validateForm();
        if (!isValid) {
            showState('empty'); // remain or show error
            return;
        }

        // Hide errors and trigger generation animation
        hideErrorBanner();
        generateGiftBox();
    });

    // Reset Button Listener
    btnReset.addEventListener('click', () => {
        giftForm.reset();
        chipBtns.forEach(b => b.classList.remove('active'));
        clearAllErrors();
        showState('empty');
    });

    // Regenerate Button Listener
    btnRegenerate.addEventListener('click', () => {
        if (validateForm()) {
            generateGiftBox();
        }
    });

    // --- Core Functions ---

    /**
     * Form Validation Handler
     * Checks all fields, updates UI errors if invalid
     */
    function validateForm() {
        let valid = true;
        let firstErrorMsg = "";

        // Check Recipient
        if (!recipientSelect.value) {
            showFieldError(groupRecipient, recipientError);
            valid = false;
            if (!firstErrorMsg) firstErrorMsg = "Оберіть отримувача подарунку";
        } else {
            clearFieldError(groupRecipient, recipientError);
        }

        // Check Event
        if (!eventSelect.value) {
            showFieldError(groupEvent, eventError);
            valid = false;
            if (!firstErrorMsg) firstErrorMsg = "Оберіть подію або нагоду";
        } else {
            clearFieldError(groupEvent, eventError);
        }

        // Check Budget
        const budgetVal = parseFloat(budgetInput.value);
        if (!budgetInput.value || isNaN(budgetVal) || budgetVal < 300) {
            showFieldError(groupBudget, budgetError);
            valid = false;
            if (!firstErrorMsg) firstErrorMsg = "Вкажіть бюджет (мінімум 300 грн)";
        } else {
            clearFieldError(groupBudget, budgetError);
        }

        // Show global top error banner if invalid
        if (!valid) {
            showErrorBanner(firstErrorMsg || "Будь ласка, заповніть усі необхідні поля форми!");
        }

        return valid;
    }

    function showFieldError(groupEl, errorEl) {
        groupEl.classList.add('has-error');
        errorEl.classList.remove('hidden');
    }

    function clearFieldError(groupEl, errorEl) {
        groupEl.classList.remove('has-error');
        errorEl.classList.add('hidden');
    }

    function clearAllErrors() {
        clearFieldError(groupRecipient, recipientError);
        clearFieldError(groupEvent, eventError);
        clearFieldError(groupBudget, budgetError);
        hideErrorBanner();
    }

    function showErrorBanner(msg) {
        errorMessage.textContent = msg;
        errorBanner.classList.remove('hidden');
    }

    function hideErrorBanner() {
        errorBanner.classList.add('hidden');
    }

    /**
     * Switch Display Section State
     * @param {'empty' | 'loading' | 'result'} state 
     */
    function showState(state) {
        stateEmpty.classList.add('hidden');
        stateLoading.classList.add('hidden');
        stateResult.classList.add('hidden');

        if (state === 'empty') stateEmpty.classList.remove('hidden');
        if (state === 'loading') stateLoading.classList.remove('hidden');
        if (state === 'result') stateResult.classList.remove('hidden');
    }

    /**
     * Gift Box Calculation & Generation Algorithm
     */
    function generateGiftBox() {
        showState('loading');

        // Extract criteria
        const recipient = recipientSelect.value;
        const occasion = eventSelect.value;
        const targetBudget = Math.floor(parseFloat(budgetInput.value));

        // Simulated processing delay for premium feel
        setTimeout(() => {
            // Get candidate item pool for recipient
            const pool = [...(giftDatabase[recipient] || giftDatabase.him)];

            // Shuffle pool to support "Regenerate" variations
            const shuffledPool = pool.sort(() => 0.5 - Math.random());

            // Reserve budget for packaging (approx 160 грн)
            const packagingCost = packagingItems.reduce((sum, item) => sum + item.price, 0);
            let remainingBudget = targetBudget - packagingCost;

            if (remainingBudget < 150) {
                // Low budget handling: adjust packaging cost proportionally
                remainingBudget = Math.max(100, targetBudget - 60);
            }

            // Target number of items (3 to 5 depending on budget)
            let itemCount = 3;
            if (targetBudget >= 2000) itemCount = 4;
            if (targetBudget >= 4000) itemCount = 5;

            // Select items and calculate realistic prices
            const selectedItems = [];
            let currentTotal = packagingCost;

            // Budget distribution weights (e.g. 50%, 30%, 20%)
            const chosenPool = shuffledPool.slice(0, itemCount);
            const totalWeight = chosenPool.reduce((sum, item) => sum + item.baseWeight, 0);

            chosenPool.forEach((item) => {
                // Proportionally assign price within total budget
                const rawPrice = Math.round((item.baseWeight / totalWeight) * remainingBudget);
                // Round price to nice 10s (e.g. 350, 480)
                const roundedPrice = Math.max(80, Math.round(rawPrice / 10) * 10);
                
                selectedItems.push({
                    name: item.name,
                    desc: item.desc,
                    icon: item.icon,
                    price: roundedPrice
                });
                
                currentTotal += roundedPrice;
            });

            // Adjust if total exceeds budget slightly
            if (currentTotal > targetBudget) {
                const diff = currentTotal - targetBudget;
                if (selectedItems.length > 0) {
                    selectedItems[0].price = Math.max(50, selectedItems[0].price - diff);
                    currentTotal = targetBudget;
                }
            }

            // Render Result UI
            renderResultCard({
                recipient,
                occasion,
                targetBudget,
                totalPrice: currentTotal,
                items: [...selectedItems, ...packagingItems]
            });

            showState('result');
        }, 650);
    }

    /**
     * Renders Generated Box Data into DOM
     */
    function renderResultCard({ recipient, occasion, targetBudget, totalPrice, items }) {
        const titleSuffix = occasionTitles[occasion] || "«Особливий Презент»";
        const recipientLabels = {
            him: "для Нього",
            her: "для Неї",
            child: "для Дитини",
            colleague: "для Колеги",
            parents: "для Батьків",
            friend: "для Друга"
        };

        resultTag.textContent = `✨ Подарунок ${recipientLabels[recipient] || ''}`;
        resultTitle.textContent = `Подарунковий Бокс ${titleSuffix}`;
        resultSubtitle.textContent = `Ідеальне поєднання за бюджетом до ${formatCurrency(targetBudget)}`;

        itemsCount.textContent = `${items.length} елементи`;

        // Render Items List
        itemsList.innerHTML = items.map(item => `
            <li class="item-row">
                <div class="item-info">
                    <span class="item-icon">${item.icon}</span>
                    <div>
                        <span class="item-name">${item.name}</span>
                        <span class="item-desc">${item.desc}</span>
                    </div>
                </div>
                <div class="item-price">${formatCurrency(item.price)}</div>
            </li>
        `).join('');

        // Summary calculations
        summaryTargetBudget.textContent = formatCurrency(targetBudget);
        summaryTotalPrice.textContent = formatCurrency(totalPrice);

        const savings = targetBudget - totalPrice;
        if (savings > 0) {
            summarySavings.textContent = `Залишок budget: ${formatCurrency(savings)} (економія)`;
            summarySavings.style.color = "var(--success-color)";
        } else {
            summarySavings.textContent = `Точне влучання у бюджет!`;
            summarySavings.style.color = "var(--primary-color)";
        }
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('uk-UA').format(amount) + ' ₴';
    }
});
