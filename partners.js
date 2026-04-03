const SUPABASE_URL = 'https://ffljujqajzuomxmcaflg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KPc0EGIzWzO5PAvdToaqdA_VZ_Jg3gc';
    

    async function loadPartners() {
        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/partners?order=display_order.asc`,
                {
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                }
            );
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const partners = await response.json();
            
            if (partners && partners.length > 0) {
                renderPartners(partners);
            } else {
                loadLocalPartners();
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            loadLocalPartners();
        }
    }
    
    function renderPartners(partners) {
        const partnerRow = document.querySelector('.partner-row');
        if (!partnerRow) {
            console.error('Элемент .partner-row не найден');
            return;
        }
        
        partnerRow.innerHTML = '';
        
        partners.forEach(partner => {
            const partnerCard = document.createElement('div');
            partnerCard.className = 'partner-card';
            partnerCard.innerHTML = `
                <img src="${partner.image_url}" alt="${partner.name}" class="partner-photo" draggable="false">
                <div class="partner-name">${partner.name}</div>
                <div class="partner-time">${partner.delivery_time}</div>
            `;
            partnerRow.appendChild(partnerCard);
        });
        
        console.log(`Загружено ${partners.length} партнеров`);
    }
    
    function loadLocalPartners() {
        const localPartners = [
            { name: 'Пятерочка', image_url: 'images/v368_514.png', delivery_time: '15-20 мин' },
            { name: 'Перекресток', image_url: 'images/v368_523.png', delivery_time: '25-30 мин' },
            { name: 'Магнит', image_url: 'images/v368_530.png', delivery_time: '1ч.' },
            { name: 'Лента', image_url: 'images/v368_536.png', delivery_time: '1-15ч.' }
        ];
        renderPartners(localPartners);
    }
    

    document.addEventListener('DOMContentLoaded', loadPartners);
