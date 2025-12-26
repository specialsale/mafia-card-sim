// 직업별 확률 (2티어)
const JOB_PROBABILITIES = {
    '마피아': 25,
    '스파이': 0.9259,
    '짐승인간': 0.9259,
    '마담': 0.9259,
    '도둑': 0.9259,
    '과학자': 0.9259,
    '마녀': 0.9259,
    '사기꾼': 0.9259,
    '청부업자': 0.9259,
    '대부': 0.9259,
    '교주': 8.3333,
    '경찰': 2.7778,
    '자경단원': 2.7778,
    '요원': 2.7778,
    '의사': 8.3333,
    '군인': 1.8939,
    '정치인': 1.8939,
    '영매': 1.8939,
    '연인': 1.8939,
    '기자': 1.8939,
    '건달': 1.8939,
    '사립탐정': 1.8939,
    '도굴꾼': 1.8939,
    '테러리스트': 1.8939,
    '성직자': 1.8939,
    '마술사': 1.8939,
    '예언자': 1.8939,
    '판사': 1.8939,
    '간호사': 1.8939,
    '해커': 1.8939,
    '심리학자': 1.8939,
    '용병': 1.8939,
    '공무원': 1.8939,
    '비밀결사': 1.8939,
    '파파라치': 1.8939,
    '최면술사': 1.8939,
    '점쟁이': 1.8939
};

// 악행을 가진 직업들 (마피아부터 교주까지)
const EVIL_JOBS = [
    '마피아', '스파이', '짐승인간', '마담', '도둑', '과학자', '마녀', 
    '사기꾼', '청부업자', '대부', '교주'
];

// 마피아팀 보조직업들
const MAFIA_TEAM_JOBS = [
    '스파이', '짐승인간', '마담', '도둑', '과학자', '마녀', 
    '사기꾼', '청부업자', '대부'
];

// 3티어 능력 풀
const TIER3_ABILITIES = ['고무', '냉정', '달변', '쇼맨십', '숙련', '열정', '탐욕', '보험'];
const TIER3_SPECIAL_ABILITIES = ['고무', '냉정', '달변', '쇼맨십', '숙련', '열정', '탐욕', '광기']; // 마피아, 짐승인간용

// 4-6티어 공용 능력
const COMMON_ABILITIES = ['결백', '도주', '독심술', '밀서', '배심원', '위증', '유언', '지박령', '확성기'];

// 악행 팀 추가 능력
const EVIL_TEAM_ABILITIES = ['지령', '시한부', '암구호'];

// 마피아팀 보조직업 추가 능력
const MAFIA_TEAM_ABILITIES = ['밀정'];

// 정의 팀 추가 능력
const JUSTICE_TEAM_ABILITIES = ['유품', '정보원'];

// 직업별 고유 능력
const JOB_UNIQUE_ABILITIES = {
    '마피아': ['무법자', '수배', '수습', '승부수', '야습', '위선', '은폐', '저격', '퇴마', '독살'],
    '스파이': ['부검', '자객', '미인계'],
    '짐승인간': ['야만성', '포효'],
    '마담': ['데뷔', '현혹'],
    '도둑': ['조문', '후계자'],
    '마녀': ['망각술'],
    '과학자': ['왜곡', '분석'],
    '청부업자': ['직감'],
    '사기꾼': ['미인계'],
    '대부': ['뒷처리'],
    '교주': ['설파'],
    '경찰': ['기밀', '부검', '영장', '도청'],
    '요원': ['휴민트'],
    '자경단원': ['결사'],
    '의사': ['검진', '박애', '진정'],
    '영매': ['강령'],
    '연인': ['원한', '헌신'],
    '군인': ['불굴', '정신력'],
    '정치인': ['독재', '불문율'],
    '건달': ['연타', '길동무'],
    '기자': ['부고', '속보'],
    '사립탐정': ['함정', '도청'],
    '도굴꾼': ['계승', '망령'],
    '테러리스트': ['섬광', '유폭'],
    '성직자': ['구마', '축복'],
    '예언자': ['선각자', '사도'],
    '판사': ['관권', '불문율'],
    '간호사': ['선서', '검시'],
    '마술사': ['조수', '투시'],
    '해커': ['동기화', '도청'],
    '심리학자': ['프로파일링'],
    '용병': ['추적', '결사'],
    '공무원': ['감사', '색출', '공조'],
    '비밀결사': ['검시', '표식'],
    '파파라치': ['눈치'],
    '최면술사': ['암시'],
    '점쟁이': ['아르카나']
};

// 확률에 따른 랜덤 선택 함수
function weightedRandom(items) {
    const total = items.reduce((sum, item) => sum + item.probability, 0);
    let random = Math.random() * total;
    
    for (const item of items) {
        random -= item.probability;
        if (random <= 0) {
            return item.value;
        }
    }
    
    return items[items.length - 1].value;
}

// 배열에서 랜덤 선택
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 배열에서 중복 없이 여러 개 선택
function randomSample(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

// 1티어 능력 결정 (1티어 카드용 - 랜덤 확률)
function getTier1Ability() {
    return Math.random() < 0.417 ? '악행' : '정의';
}

// 직업에 따라 1티어 능력 결정 (2티어 이상 카드용)
function getTier1AbilityByJob(job) {
    return EVIL_JOBS.includes(job) ? '악행' : '정의';
}

// 2티어 직업 결정
function getTier2Job() {
    const jobs = Object.keys(JOB_PROBABILITIES).map(job => ({
        value: job,
        probability: JOB_PROBABILITIES[job]
    }));
    return weightedRandom(jobs);
}

// 3티어 능력 결정
function getTier3Ability(job) {
    if (job === '마피아' || job === '짐승인간') {
        return randomChoice(TIER3_SPECIAL_ABILITIES);
    }
    return randomChoice(TIER3_ABILITIES);
}

// 4-6티어 능력 풀 생성
function getAbilityPool(tier1Ability, job) {
    const pool = [...COMMON_ABILITIES];
    
    // 악행 팀 추가 능력
    if (tier1Ability === '악행') {
        pool.push(...EVIL_TEAM_ABILITIES);
    }
    
    // 정의 팀 추가 능력
    if (tier1Ability === '정의') {
        pool.push(...JUSTICE_TEAM_ABILITIES);
    }
    
    // 마피아팀 보조직업 추가 능력
    if (MAFIA_TEAM_JOBS.includes(job)) {
        pool.push(...MAFIA_TEAM_ABILITIES);
    }
    
    // 직업별 고유 능력
    if (JOB_UNIQUE_ABILITIES[job]) {
        pool.push(...JOB_UNIQUE_ABILITIES[job]);
    }
    
    return pool;
}

// 직업명 매칭 (대소문자 구분 없이)
function matchJobName(inputJob) {
    const allJobs = Object.keys(JOB_PROBABILITIES);
    const normalizedInput = inputJob.trim();
    
    // 정확한 매칭 (대소문자 무시)
    for (const job of allJobs) {
        if (job.toLowerCase() === normalizedInput.toLowerCase()) {
            return job;
        }
    }
    
    return null;
}

// 카드 생성
function generateCard(targetTier, specifiedJob = null) {
    const card = {
        tier1: null,
        tier2: null,
        tier3: null,
        tier4: null,
        tier5: null,
        tier6: null
    };
    
    // 1티어 카드인 경우: 랜덤 확률로 악행/정의 결정
    if (targetTier === 1) {
        card.tier1 = getTier1Ability();
        // 1티어 카드는 직업이 없음
        return card;
    }
    
    // 2티어 이상인 경우: 지정된 직업이 있으면 사용, 없으면 랜덤 선택
    if (specifiedJob) {
        card.tier2 = specifiedJob;
    } else {
        card.tier2 = getTier2Job();
    }
    card.tier1 = getTier1AbilityByJob(card.tier2);
    
    // 3티어 능력
    if (targetTier >= 3) {
        card.tier3 = getTier3Ability(card.tier2);
    }
    
    // 4-6티어 능력
    if (targetTier >= 4) {
        const abilityPool = getAbilityPool(card.tier1, card.tier2);
        const selectedAbilities = randomSample(abilityPool, targetTier - 3);
        
        if (targetTier >= 4) card.tier4 = selectedAbilities[0] || null;
        if (targetTier >= 5) card.tier5 = selectedAbilities[1] || null;
        if (targetTier >= 6) card.tier6 = selectedAbilities[2] || null;
    }
    
    return card;
}

// 카드를 텍스트로 포맷팅
function formatCard(card, index) {
    let result = `<div class="card-result">`;
    result += `<h3>카드 #${index + 1}</h3>`;
    result += `<div class="tier-section"><span class="tier-label">1티어 능력:</span><span class="tier-value">${card.tier1}</span></div>`;
    
    if (card.tier2) {
        result += `<div class="tier-section"><span class="tier-label">2티어 능력:</span><span class="tier-value">${card.tier2}</span></div>`;
    }
    
    if (card.tier3) {
        result += `<div class="tier-section"><span class="tier-label">3티어 능력:</span><span class="tier-value">${card.tier3}</span></div>`;
    }
    if (card.tier4) {
        result += `<div class="tier-section"><span class="tier-label">4티어 능력:</span><span class="tier-value">${card.tier4}</span></div>`;
    }
    if (card.tier5) {
        result += `<div class="tier-section"><span class="tier-label">5티어 능력:</span><span class="tier-value">${card.tier5}</span></div>`;
    }
    if (card.tier6) {
        result += `<div class="tier-section"><span class="tier-label">6티어 능력:</span><span class="tier-value">${card.tier6}</span></div>`;
    }
    
    result += `</div>`;
    return result;
}

// 터미널 출력 함수
function addOutput(message, className = '') {
    const terminalOutput = document.getElementById('terminal-output');
    const outputLine = document.createElement('div');
    outputLine.className = `output-line ${className}`;
    outputLine.innerHTML = message;
    
    // 입력 필드 앞에 삽입
    const promptLine = terminalOutput.querySelector('.prompt-line');
    terminalOutput.insertBefore(outputLine, promptLine);
    
    // 스크롤을 맨 아래로
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// 명령어 파싱 및 실행
function executeCommand(command) {
    const trimmed = command.trim();
    const trimmedUpper = trimmed.toUpperCase();
    
    // "N M TIER 직업명" 또는 "N M TIER" 형식 지원
    const match1 = trimmedUpper.match(/^(\d+)\s+(\d+)\s+TIER(?:\s+(.+))?$/); // N M TIER [직업명]
    const match2 = trimmedUpper.match(/^(\d+)\s+TIER(?:\s+(.+))?$/); // N TIER [직업명]
    
    let count, tier, specifiedJob = null;
    
    if (match1) {
        // "N M TIER [직업명]" 형식
        count = parseInt(match1[1]);
        tier = parseInt(match1[2]);
        if (match1[3]) {
            const jobInput = trimmed.substring(trimmedUpper.indexOf('TIER') + 4).trim();
            specifiedJob = matchJobName(jobInput);
            if (!specifiedJob) {
                addOutput(`<span class="error">알 수 없는 직업명입니다: "${jobInput}"</span>`, 'error');
                return;
            }
            if (tier === 1) {
                addOutput(`<span class="error">1티어 카드는 직업을 지정할 수 없습니다.</span>`, 'error');
                return;
            }
        }
    } else if (match2) {
        // "N TIER [직업명]" 형식
        tier = parseInt(match2[1]);
        count = 1;
        if (match2[2]) {
            const jobInput = trimmed.substring(trimmedUpper.indexOf('TIER') + 4).trim();
            specifiedJob = matchJobName(jobInput);
            if (!specifiedJob) {
                addOutput(`<span class="error">알 수 없는 직업명입니다: "${jobInput}"</span>`, 'error');
                return;
            }
            if (tier === 1) {
                addOutput(`<span class="error">1티어 카드는 직업을 지정할 수 없습니다.</span>`, 'error');
                return;
            }
        }
    } else {
        addOutput(`<span class="error">잘못된 명령어입니다. 형식: "N TIER" 또는 "N M TIER" 또는 "N M TIER 직업명"</span>`, 'error');
        return;
    }
    
    if (tier < 1 || tier > 6) {
        addOutput(`<span class="error">티어는 1부터 6까지 가능합니다.</span>`, 'error');
        return;
    }
    
    if (count < 1 || count > 100) {
        addOutput(`<span class="error">카드 개수는 1개부터 100개까지 가능합니다.</span>`, 'error');
        return;
    }
    
    if (specifiedJob) {
        addOutput(`<span class="info">${count}개의 ${tier}티어 ${specifiedJob} 카드를 뽑는 중...</span>`, 'info');
    } else {
        addOutput(`<span class="info">${count}개의 ${tier}티어 카드를 뽑는 중...</span>`, 'info');
    }
    
    // 카드 생성
    for (let i = 0; i < count; i++) {
        const card = generateCard(tier, specifiedJob);
        addOutput(formatCard(card, i));
    }
    
    addOutput(`<div class="separator"></div>`, '');
    if (specifiedJob) {
        addOutput(`<span class="success">완료! ${count}개의 ${tier}티어 ${specifiedJob} 카드를 생성했습니다.</span>`, 'success');
    } else {
        addOutput(`<span class="success">완료! ${count}개의 ${tier}티어 카드를 생성했습니다.</span>`, 'success');
    }
}

// 확률 계산 관련 함수들
let selectedTier1 = null;
let selectedJob = null;
let selectedTier3 = null;
let selectedTier4 = null;
let selectedTier5 = null;
let selectedTier6 = null;

// 전체 확률 합 계산
function getTotalProbability() {
    return Object.values(JOB_PROBABILITIES).reduce((sum, prob) => sum + prob, 0);
}

// 1티어 능력 선택 시 2티어 직업 목록 생성
function updateTier2Jobs(tier1Ability) {
    selectedTier1 = tier1Ability;
    selectedJob = null;
    selectedTier3 = null;
    selectedTier4 = null;
    selectedTier5 = null;
    selectedTier6 = null;
    
    const tier2Section = document.getElementById('tier2-section');
    const tier2Checkboxes = document.getElementById('tier2-checkboxes');
    const tier2Probability = document.getElementById('tier2-probability');
    
    if (!tier1Ability) {
        tier2Section.style.display = 'none';
        return;
    }
    
    tier2Section.style.display = 'block';
    tier2Checkboxes.innerHTML = '';
    
    const jobs = tier1Ability === '악행' ? EVIL_JOBS : Object.keys(JOB_PROBABILITIES).filter(job => !EVIL_JOBS.includes(job));
    const totalProb = getTotalProbability();
    
    // 라디오 버튼 변경 시 모든 label 업데이트하는 함수
    const updateTier2Styles = () => {
        tier2Checkboxes.querySelectorAll('label').forEach(lbl => {
            const input = lbl.querySelector('input');
            if (input && input.checked) {
                lbl.style.background = '#3e3e42';
                lbl.style.color = '#4ec9b0';
            } else {
                lbl.style.background = '#2d2d30';
                lbl.style.color = '#d4d4d4';
            }
        });
    };
    
    jobs.forEach(job => {
        const prob = JOB_PROBABILITIES[job];
        const normalizedProb = (prob / totalProb * 100).toFixed(4);
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="tier2" value="${job}"> ${job} (${prob}%)`;
        const input = label.querySelector('input');
        input.addEventListener('change', function() {
            if (this.checked) {
                updateTier2Styles();
                selectedJob = job;
                tier2Probability.textContent = `선택 확률: ${normalizedProb}%`;
                updateTier3Abilities(job);
                updateTier4Abilities(tier1Ability, job);
                calculateProbability();
            }
        });
        tier2Checkboxes.appendChild(label);
    });
    
    tier2Probability.textContent = '';
}

// 3티어 능력 목록 생성
function updateTier3Abilities(job) {
    const tier3Section = document.getElementById('tier3-section');
    const tier3Checkboxes = document.getElementById('tier3-checkboxes');
    const tier3Probability = document.getElementById('tier3-probability');
    
    if (!job) {
        tier3Section.style.display = 'none';
        return;
    }
    
    tier3Section.style.display = 'block';
    tier3Checkboxes.innerHTML = '';
    
    const abilities = (job === '마피아' || job === '짐승인간') ? TIER3_SPECIAL_ABILITIES : TIER3_ABILITIES;
    const prob = 1 / abilities.length * 100;
    
    // 라디오 버튼 변경 시 모든 label 업데이트하는 함수
    const updateTier3Styles = () => {
        tier3Checkboxes.querySelectorAll('label').forEach(lbl => {
            const input = lbl.querySelector('input');
            if (input && input.checked) {
                lbl.style.background = '#3e3e42';
                lbl.style.color = '#4ec9b0';
            } else {
                lbl.style.background = '#2d2d30';
                lbl.style.color = '#d4d4d4';
            }
        });
    };
    
    // 상관없음 옵션 추가
    const noneLabel = document.createElement('label');
    noneLabel.innerHTML = `<input type="radio" name="tier3" value="상관없음" checked> 상관없음`;
    const noneInput = noneLabel.querySelector('input');
    noneInput.addEventListener('change', function() {
        if (this.checked) {
            updateTier3Styles();
            selectedTier3 = null;
            tier3Probability.textContent = `상관없음 선택 시 확률: ${prob.toFixed(4)}%`;
            calculateProbability();
        }
    });
    tier3Checkboxes.appendChild(noneLabel);
    
    abilities.forEach(ability => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="tier3" value="${ability}"> ${ability}`;
        const input = label.querySelector('input');
        input.addEventListener('change', function() {
            if (this.checked) {
                updateTier3Styles();
                selectedTier3 = ability;
                tier3Probability.textContent = `선택 확률: ${prob.toFixed(4)}%`;
                calculateProbability();
            }
        });
        tier3Checkboxes.appendChild(label);
    });
    
    tier3Probability.textContent = `상관없음 선택 시 확률: ${prob.toFixed(4)}%`;
    updateTier3Styles();
}

// 4-6티어 능력 목록 생성
function updateTier4Abilities(tier1Ability, job) {
    const abilityPool = getAbilityPool(tier1Ability, job);
    
    // 4티어
    updateTierAbility('tier4-section', 'tier4-checkboxes', 'tier4', abilityPool, (ability) => {
        selectedTier4 = ability;
        // 5티어 업데이트 (4티어 선택에 따라)
        updateTier5Abilities(tier1Ability, job, ability);
        // 6티어도 업데이트 (5티어가 이미 선택되어 있다면)
        if (selectedTier5) {
            updateTier6Abilities(tier1Ability, job, ability, selectedTier5);
        } else {
            updateTier6Abilities(tier1Ability, job, ability, null);
        }
        calculateProbability();
    });
    
    // 5티어 (초기화 - 4티어 선택 없음)
    updateTier5Abilities(tier1Ability, job, null);
    
    // 6티어 (초기화)
    updateTier6Abilities(tier1Ability, job, null, null);
}

function updateTier5Abilities(tier1Ability, job, tier4Ability) {
    const abilityPool = getAbilityPool(tier1Ability, job);
    const availableAbilities = tier4Ability ? abilityPool.filter(a => a !== tier4Ability) : abilityPool;
    
    // 4티어가 선택되지 않았으면 5티어도 초기화
    if (!tier4Ability) {
        selectedTier5 = null;
    }
    
    updateTierAbility('tier5-section', 'tier5-checkboxes', 'tier5', availableAbilities, (ability) => {
        selectedTier5 = ability;
        // 6티어 업데이트
        updateTier6Abilities(tier1Ability, job, tier4Ability || selectedTier4, ability);
        calculateProbability();
    });
}

function updateTier6Abilities(tier1Ability, job, tier4Ability, tier5Ability) {
    const abilityPool = getAbilityPool(tier1Ability, job);
    const excluded = [tier4Ability, tier5Ability].filter(a => a);
    const availableAbilities = abilityPool.filter(a => !excluded.includes(a));
    
    updateTierAbility('tier6-section', 'tier6-checkboxes', 'tier6', availableAbilities, (ability) => {
        selectedTier6 = ability;
        calculateProbability();
    });
}

function updateTierAbility(sectionId, checkboxesId, name, abilities, onChange) {
    const section = document.getElementById(sectionId);
    const checkboxes = document.getElementById(checkboxesId);
    
    if (!abilities || abilities.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    checkboxes.innerHTML = '';
    
    // 현재 선택된 값 확인
    const currentValue = name === 'tier4' ? selectedTier4 : (name === 'tier5' ? selectedTier5 : selectedTier6);
    const isNoneSelected = currentValue === null;
    
    // 라디오 버튼 변경 시 모든 label 업데이트하는 함수
    const updateLabelStyles = () => {
        checkboxes.querySelectorAll('label').forEach(lbl => {
            const input = lbl.querySelector('input');
            if (input && input.checked) {
                lbl.style.background = '#3e3e42';
                lbl.style.color = '#4ec9b0';
            } else {
                lbl.style.background = '#2d2d30';
                lbl.style.color = '#d4d4d4';
            }
        });
    };
    
    // 상관없음 옵션 추가
    const noneLabel = document.createElement('label');
    noneLabel.innerHTML = `<input type="radio" name="${name}" value="상관없음" ${isNoneSelected ? 'checked' : ''}> 상관없음`;
    const noneInput = noneLabel.querySelector('input');
    noneInput.addEventListener('change', function() {
        if (this.checked) {
            updateLabelStyles();
            if (name === 'tier4') {
                selectedTier4 = null;
                // 5티어와 6티어 초기화
                selectedTier5 = null;
                selectedTier6 = null;
                if (selectedTier1 && selectedJob) {
                    updateTier5Abilities(selectedTier1, selectedJob, null);
                    updateTier6Abilities(selectedTier1, selectedJob, null, null);
                }
            } else if (name === 'tier5') {
                selectedTier5 = null;
                // 6티어 초기화
                selectedTier6 = null;
                if (selectedTier1 && selectedJob) {
                    updateTier6Abilities(selectedTier1, selectedJob, selectedTier4, null);
                }
            } else if (name === 'tier6') {
                selectedTier6 = null;
            }
            onChange(null);
        }
    });
    checkboxes.appendChild(noneLabel);
    
    abilities.forEach(ability => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="${name}" value="${ability}" ${currentValue === ability ? 'checked' : ''}> ${ability}`;
        const input = label.querySelector('input');
        input.addEventListener('change', function() {
            if (this.checked) {
                updateLabelStyles();
                onChange(ability);
            }
        });
        checkboxes.appendChild(label);
    });
    
    // 초기 스타일 적용
    updateLabelStyles();
}

// 확률 계산
function calculateProbability() {
    const finalProbDisplay = document.getElementById('final-probability');
    const orderOption = document.getElementById('order-option');
    
    if (!selectedTier1 || !selectedJob) {
        finalProbDisplay.innerHTML = '<h2>최종 확률: -</h2>';
        if (orderOption) orderOption.style.display = 'none';
        return;
    }
    
    const totalProb = getTotalProbability();
    const jobProb = JOB_PROBABILITIES[selectedJob];
    const normalizedJobProb = jobProb / totalProb;
    
    let probability = normalizedJobProb;
    
    // 3티어 확률
    if (selectedTier3 !== null) {
        const abilities = (selectedJob === '마피아' || selectedJob === '짐승인간') ? TIER3_SPECIAL_ABILITIES : TIER3_ABILITIES;
        probability *= (1 / abilities.length);
    }
    
    // 4-6티어 확률
    const abilityPool = getAbilityPool(selectedTier1, selectedJob);
    const selectedAbilities = [selectedTier4, selectedTier5, selectedTier6].filter(a => a !== null);
    
    // 순서 옵션 표시 조건 확인
    if (orderOption) {
        if (
            selectedTier4 !== null &&
            selectedTier5 !== null
        ) {
            orderOption.style.display = 'block';
        } else {
            orderOption.style.display = 'none';
            if (document.getElementById('order-flexible')) {
                document.getElementById('order-flexible').checked = false;
            }
        }
    }
    
    if (selectedAbilities.length > 0) {
        const orderFlexible = document.getElementById('order-flexible')?.checked || false;
        const neededCount = selectedAbilities.length;
        const poolSize = abilityPool.length;
        
        // 선택된 능력이 모두 풀에 있는지 확인
        const allInPool = selectedAbilities.every(a => abilityPool.includes(a));
        if (!allInPool) {
            finalProbDisplay.innerHTML = '<h2>최종 확률: 0%</h2><p style="margin-top: 10px; color: #f48771;">선택한 능력이 해당 직업의 능력 풀에 없습니다.</p>';
            return;
        }
        
        // 중복 확인
        const uniqueAbilities = [...new Set(selectedAbilities)];
        if (uniqueAbilities.length !== selectedAbilities.length) {
            finalProbDisplay.innerHTML = '<h2>최종 확률: 0%</h2><p style="margin-top: 10px; color: #f48771;">중복된 능력을 선택할 수 없습니다.</p>';
            return;
        }
        
        if (neededCount === 1) {
            probability *= (1 / poolSize);
        } else if (neededCount === 2) {
            const combinations = poolSize * (poolSize - 1) / 2;
            if (orderFlexible) {
                probability *= (2 / combinations); // 순서 바꿔도 되면 2배
            } else {
                probability *= (1 / combinations);
            }
        } else if (neededCount === 3) {
            const combinations = poolSize * (poolSize - 1) * (poolSize - 2) / 6;
            if (orderFlexible) {
                probability *= (6 / combinations); // 3! = 6배
            } else {
                probability *= (1 / combinations);
            }
        }
    }
    
    const percentProb = probability * 100;
    const fractionProb = probability > 0 ? 1 / probability : Infinity;
    
    if (probability > 0) {
        finalProbDisplay.innerHTML = `
            <h2>최종 확률: ${percentProb.toFixed(6)}%</h2>
            <p style="margin-top: 10px; color: #d4d4d4;">약 1/${Math.round(fractionProb).toLocaleString()} 확률</p>
        `;
    } else {
        finalProbDisplay.innerHTML = '<h2>최종 확률: 0%</h2>';
    }
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
    
    // 1티어 능력 선택 스타일 업데이트 함수
    const updateTier1Styles = () => {
        document.querySelectorAll('input[name="tier1"]').forEach(radio => {
            const label = radio.closest('label');
            if (label) {
                if (radio.checked) {
                    label.style.background = '#3e3e42';
                    label.style.color = '#4ec9b0';
                } else {
                    label.style.background = '#2d2d30';
                    label.style.color = '#d4d4d4';
                }
            }
        });
    };
    
    // 1티어 능력 선택
    document.querySelectorAll('input[name="tier1"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateTier1Styles();
                updateTier2Jobs(this.value);
            }
        });
    });
    
    // 초기 스타일 적용
    updateTier1Styles();
    
    // 순서 바꿔도 되는지 체크박스
    const orderFlexible = document.getElementById('order-flexible');
    if (orderFlexible) {
        orderFlexible.addEventListener('change', function() {
            calculateProbability();
        });
    }
    
    // 뽑기 시뮬레이터 입력
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim();
                if (command) {
                    addOutput(`<span class="prompt">$</span> ${command}`, '');
                    executeCommand(command);
                    this.value = '';
                }
            }
        });
        
        // 포커스 유지
        commandInput.focus();
    }
});

