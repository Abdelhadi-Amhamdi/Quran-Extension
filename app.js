
// const logo = window.document.querySelector("img.lnXdpd");
// logo.remove()



const ar_quran = document.querySelector(".text-ar > .text");
const ar_title = document.querySelector(".text-ar > .title");
const en_quran = document.querySelector(".text-en > .text");
const en_title = document.querySelector(".text-en > .title");
const change_theme_btn = document.querySelector(".theme");
const body_section = document.querySelector("body");
const audio_section = document.querySelector(".audio");
const audio_btn = document.querySelector(".play-btn");
const close_btn = document.querySelector(".close-btn");
const audio_name = document.querySelector(".the-name");
const audio_input_val = document.querySelector(".val-pgr");

let ar_data;
let en_data;
let random_ayahs;
let theme;
let sura_audio;
var input_val = 0;

var index = 0;

theme = localStorage.getItem('theme');
if (!theme)
    localStorage.setItem('theme', 'dark');

AOS.init();
// ar_title.innerText = `القرآن الكريم برسم العثماني - Uthmani`;
// ar_quran.innerText = `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ يَسْـَٔلُونَكَ عَنِ ٱلْأَنفَالِ ۖ قُلِ ٱلْأَنفَالُ لِلَّهِ وَٱلرَّسُولِ ۖ فَٱتَّقُوا۟ ٱللَّهَ وَأَصْلِحُوا۟ ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا۟ ٱللَّهَ وَرَسُولَهُۥٓ إِن كُنتُم مُّؤْمِنِينَ - إِنَّمَا ٱلْمُؤْمِنُونَ ٱلَّذِينَ إِذَا ذُكِرَ ٱللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ ءَايَٰتُهُۥ زَادَتْهُمْ إِيمَٰنًۭا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ`

// en_title.innerText = `القرآن الكريم برسم العثماني - Uthmani`;
// en_quran.innerText = `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ يَسْـَٔلُونَكَ عَنِ ٱلْأَنفَالِ ۖ قُلِ ٱلْأَنفَالُ لِلَّهِ وَٱلرَّسُولِ ۖ فَٱتَّقُوا۟ ٱللَّهَ وَأَصْلِحُوا۟ ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا۟ ٱللَّهَ وَرَسُولَهُۥٓ إِن كُنتُم مُّؤْمِنِينَ - إِنَّمَا ٱلْمُؤْمِنُونَ ٱلَّذِينَ إِذَا ذُكِرَ ٱللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ ءَايَٰتُهُۥ زَادَتْهُمْ إِيمَٰنًۭا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ`
var r_num_s = 0;
// var r_num_s = Math.floor(Math.random() * 10);
function is_played (audio_elm) { return !audio_elm.paused };
axios.get("http://api.alquran.cloud/v1/quran/quran-uthmani")
    .then(res => {
        ar_data = res.data.data;
        ar_title.innerText = `${ar_data.edition.name} - ${ar_data.edition.englishName}`;
        random_ayahs = ar_data.surahs[r_num_s].ayahs;
        ar_quran.innerText = `${random_ayahs[0].text} - ${random_ayahs[1].text}`
    })

axios.get("http://api.alquran.cloud/v1/quran/en.asad")
    .then(res => {
        en_data = res.data.data;
        en_title.innerText = `${en_data.edition.name} - ${en_data.edition.englishName}`;
        random_ayahs = en_data.surahs[r_num_s].ayahs;
        en_quran.innerText = `${random_ayahs[0].text} - ${random_ayahs[1].text}`
    })
axios.get("http://api.alquran.cloud/v1/quran/ar.alafasy")
    .then(res => {
        sura_audio = res.data.data.surahs[r_num_s];
        audio_name.innerText = `${sura_audio.name} - ${sura_audio.englishNameTranslation} (${sura_audio.revelationType}) `;
        console.log(sura_audio);
        audio_btn.addEventListener('click', () => {
            console.log(audio_section);
            const interval = setInterval(() => {
                if (!is_played(audio_section)) {
                    audio_section.setAttribute('src', sura_audio.ayahs[index].audio);
                    audio_section.play();
                    index++;
                    audio_input_val.style.width = `${input_val}%`
                    input_val = input_val + (100 / sura_audio.ayahs.length );
                }
            }, 1000);
            audio_btn.classList.add('hide');
            close_btn.classList.remove('hide');
        })
    })

    close_btn.addEventListener('click' , ()=> {
        audio_section.pause();
        close_btn.classList.add('hide');
        audio_btn.classList.remove('hide');
    })

change_theme_btn.addEventListener('click', () => {
    theme = localStorage.getItem('theme');
    change_Theme(theme);
})

function change_Theme (theme) {
    if (theme == 'dark') {
        localStorage.setItem('theme', 'ligth');
        body_section.classList.remove('dark');
        body_section.classList.add('ligth')
    }
    else {
        localStorage.setItem('theme', 'dark');
        body_section.classList.remove('ligth');
        body_section.classList.add('dark')
    }
}






