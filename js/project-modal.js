document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalOverlay = modal.querySelector('.project-modal__overlay');
    const closeButton = modal.querySelector('.project-modal__close');
    
    // 项目详情内容
    const projectDetails = {
        'Farmland Digitization': {
            content: `
                <div class="project-modal__section">
                    <h4>2.1.1 Precision Planting Management</h4>
                    <div class="project-modal__subsection">
                        <h5>Environmental Monitoring</h5>
                        <ul>
                            <li>Surface water monitoring (temperature, pH, salinity, nitrogen/phosphorus/potassium, heavy metals)</li>
                            <li>Soil monitoring (organic content, plant morphology, growth status)</li>
                            <li>Meteorological monitoring (light intensity, rainfall, evaporation)</li>
                            <li>Underground drainage monitoring (flow rate, salt discharge)</li>
                        </ul>
                    </div>
                    <div class="project-modal__subsection">
                        <h5>Data-Driven Applications</h5>
                        <ul>
                            <li>Crop growth analysis, task planning, autonomous vehicle control, and drone-based plant protection</li>
                        </ul>
                    </div>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.1.2 Smart Agricultural Machinery Management</h4>
                    <ul>
                        <li>Real-time tracking of machinery (fuel consumption, location, historical routes)</li>
                        <li>Resource-sharing platform to optimize machinery utilization</li>
                        <li>Machinery evaluation system for credit assurance</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.1.3 Pest and Disease Monitoring</h4>
                    <ul>
                        <li>Intelligent visual analysis for identifying pests of varying sizes and growth stages</li>
                        <li>Real-time data upload and expert diagnosis integration</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.1.4 Agricultural Traceability System</h4>
                    <ul>
                        <li>Blockchain-based end-to-end traceability across production, supply chain, and sales</li>
                        <li><strong>"Three Confirmations and One Inspection"</strong>: Confirm land, crop type, inputs; conduct quality checks; issue anti-counterfeit labels</li>
                    </ul>
                </div>
            `
        },
        'Agricultural Intelligence Platform': {
            content: `
                <div class="project-modal__section">
                    <h4>2.2.1 Agricultural Fertile Soil Platform</h4>
                    <div class="project-modal__subsection">
                        <h5>Data Infrastructure</h5>
                        <ul>
                            <li>Integration and cleansing of multi-source data (farmland, weather, market).</li>
                            <li>AI-driven analytics for disease prediction, fertilization optimization, and yield forecasting.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.2.2 Video Cloud and GIS Integrated Map</h4>
                    <ul>
                        <li>Unified access and management of video sources (drones, fixed cameras, NVRs).</li>
                        <li>Spatial visualization of sensor data, pest distribution, and agricultural alerts on a unified GIS map.</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.2.3 Command and Dispatch System</h4>
                    <ul>
                        <li>Real-time communication (voice/video), remote expert guidance.</li>
                        <li>Multi-network integration (eLTE private networks, broadband/narrowband clusters).</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>2.2.4 Smart Agriculture Cloud Data Center</h4>
                    <ul>
                        <li>Distributed architecture ("physically dispersed, logically centralized").</li>
                        <li>Unified security and operation/maintenance systems.</li>
                    </ul>
                </div>
            `
        },
        'Farmer Training Program': {
            content: `
                <div class="project-modal__section">
                    <h4>Training Content</h4>
                    <ul>
                        <li>Sustainable farming practices (organic farming, soil health, water conservation techniques)</li>
                        <li>Modern agricultural machinery operation and maintenance</li>
                        <li>Crop rotation and pest control</li>
                        <li>Agricultural product processing and market strategies</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>Implementation Approach</h4>
                    <ul>
                        <li>Classroom instruction + field practice + demonstration farms</li>
                        <li>Establish expert teams for long-term technical support</li>
                        <li>Form agricultural cooperatives to help farmers with collective sales</li>
                    </ul>
                </div>
            `
        },
        'Digital Skills Workshop': {
            content: `
                <div class="project-modal__section">
                    <h4>Training Content</h4>
                    <ul>
                        <li>Agricultural data management and smart farming (drone mapping, smart irrigation)</li>
                        <li>E-commerce and online agricultural product sales (social media marketing, online trading platforms)</li>
                        <li>Digital finance and agricultural loans (how to apply for agricultural loans, crowdfunding for farming projects)</li>
                        <li>Basic computer skills (office software, introductory programming)</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>Implementation Approach</h4>
                    <ul>
                        <li>Establish computer labs with hands-on training</li>
                        <li>Partner with tech companies to introduce agricultural digital tools</li>
                        <li>Organize online/offline training courses</li>
                    </ul>
                </div>
            `
        },
        'Youth in Agriculture': {
            content: `
                <div class="project-modal__section">
                    <h4>Training Content</h4>
                    <ul>
                        <li>Agricultural entrepreneurship and business model development (how to start an agribusiness)</li>
                        <li>Smart agriculture and emerging technologies (vertical farming, automated greenhouses, AI in agriculture)</li>
                        <li>Supply chain and market connections (how to collaborate with supermarkets and export partners)</li>
                        <li>Policy support and agricultural subsidy applications</li>
                    </ul>
                </div>
                
                <div class="project-modal__section">
                    <h4>Implementation Approach</h4>
                    <ul>
                        <li>Establish an agricultural entrepreneurship incubation center to provide business support</li>
                        <li>Organize youth agricultural innovation competitions to encourage creative projects</li>
                        <li>Partner with local universities to offer agricultural research opportunities</li>
                    </ul>
                </div>
            `
        }
    };

    // 为所有项目卡片添加点击事件
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('.project-card__img').src;
            openModal(title, description, image);
        });
    });

    // 更新弹出框位置
    function updateModalPosition() {
        const projectsLink = document.querySelector('a[href="#partners-projects"]');
        const buttonRect = projectsLink.getBoundingClientRect();
        const modalContent = modal.querySelector('.project-modal__content');
        
        // 设置弹窗内容的初始位置为按钮下方
        modalContent.style.top = `${buttonRect.bottom}px`;
    }

    // 打开模态框
    function openModal(title, description, imageUrl) {
        const modalContent = modal.querySelector('.project-modal__content');
        const modalTitle = modalContent.querySelector('.project-modal__title');
        const modalDescription = modalContent.querySelector('.project-modal__description');
        const modalImage = modalContent.querySelector('.project-modal__img');
        
        // 先更新位置，再添加动画类
        updateModalPosition();
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        document.documentElement.classList.add('no-scroll');
        
        // 使用 requestAnimationFrame 确保位置更新后再添加动画
        requestAnimationFrame(() => {
            modalContent.classList.add('active');
        });
        
        modalTitle.textContent = title;
        modalDescription.innerHTML = projectDetails[title]?.content || description;
        modalImage.src = imageUrl;
    }

    // 关闭弹窗
    function closeModal() {
        modal.classList.remove('active');
        modal.querySelector('.project-modal__content').classList.remove('active');
        modalOverlay.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
    }

    // 添加关闭事件监听
    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // 窗口大小改变时更新位置
    window.addEventListener('resize', () => {
        if (modal.classList.contains('active')) {
            updateModalPosition();
        }
    });
}); 