import React, { useState, useEffect } from 'react';
import { Reveal } from './components/Reveal';
import { Sparkles } from './components/Sparkles';
import { Music, Music2, MailOpen } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [audioUrl, setAudioUrl] = useState('https://cdn.pixabay.com/download/audio/2022/01/20/audio_b2ba2dbce2.mp3?filename=soft-indian-flute-114251.mp3');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'config', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().audioUrl) {
          setAudioUrl(docSnap.data().audioUrl);
        }
      } catch (err) {
        console.error('Error fetching config from Firebase:', err);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const newAudio = new Audio(audioUrl);
    newAudio.loop = true;
    setAudio(newAudio);
    return () => {
      newAudio.pause();
    };
  }, [audioUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = () => {
    setOpened(true);
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log('Audio play failed', e));
    }
  };

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Audio play failed', e));
    }
    setIsPlaying(!isPlaying);
  };

  const CornerOrnaments = () => (
    <>
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-wedding-gold opacity-40 rounded-tl-xl pointer-events-none -translate-x-2 -translate-y-2"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-wedding-gold opacity-40 rounded-tr-xl pointer-events-none translate-x-2 -translate-y-2"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-wedding-gold opacity-40 rounded-bl-xl pointer-events-none -translate-x-2 translate-y-2"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-wedding-gold opacity-40 rounded-br-xl pointer-events-none translate-x-2 translate-y-2"></div>
    </>
  );

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-primary font-serif selection:bg-wedding-gold-light selection:text-wedding-bg relative overflow-x-hidden">
      
      {/* Loader */}
      <div className={`fixed inset-0 z-[60] bg-wedding-bg flex flex-col items-center justify-center transition-opacity duration-1000 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-32 h-32 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-2 border-wedding-gold animate-ping opacity-20"></div>
          <div className="absolute inset-2 rounded-full border border-wedding-gold/40 animate-spin-slow"></div>
          <div className="w-full h-full rounded-full bg-wedding-primary flex items-center justify-center shadow-lg shadow-wedding-gold/20">
            <span className="font-display text-4xl text-wedding-bg">AS</span>
          </div>
        </div>
      </div>

      {/* Entrance Screen to handle audio autoplay */}
      <div className={`fixed inset-0 z-50 bg-wedding-bg flex flex-col items-center justify-center transition-transform duration-1000 ${!loading && !opened ? 'translate-y-0' : '-translate-y-full'}`}>
         <div className="w-full max-w-md p-8 text-center space-y-8 relative">
            <CornerOrnaments />
            <div className="w-24 h-24 mx-auto rounded-full bg-wedding-primary flex items-center justify-center shadow-xl shadow-wedding-gold/20 relative">
              <div className="absolute inset-1 rounded-full border border-wedding-gold/60 border-dashed"></div>
              <span className="font-display text-4xl text-wedding-bg tracking-wider">AS</span>
            </div>
            <div>
              <h2 className="tracking-[0.25em] text-sm uppercase mb-4 font-display text-wedding-gold">You're Invited</h2>
              <h1 className="font-script text-5xl text-wedding-primary mb-2">Aravind & Swetha</h1>
            </div>
            <button 
              onClick={handleOpenInvitation}
              className="mt-8 flex items-center justify-center space-x-3 mx-auto px-8 py-3 bg-wedding-primary text-wedding-bg rounded-full hover:bg-wedding-primary/90 transition-all font-display tracking-widest shadow-lg hover:shadow-wedding-primary/30"
            >
              <MailOpen className="w-4 h-4" />
              <span>OPEN INVITATION</span>
            </button>
         </div>
      </div>

      {opened && <Sparkles />}

      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 bg-wedding-bg/90 border border-wedding-gold/30 p-4 rounded-full shadow-lg text-wedding-primary hover:bg-wedding-gold/10 transition-all duration-300 backdrop-blur-md"
        aria-label="Toggle background music"
      >
        {isPlaying ? <Music className="w-5 h-5 animate-pulse" /> : <Music2 className="w-5 h-5 opacity-60" />}
      </button>

      {/* Page 1 (Cover & Families) */}
      <section className="w-full min-h-screen flex flex-col items-center py-20 px-4 md:px-8 relative border-b border-wedding-gold/20">
        <div className="w-full max-w-4xl bg-white/60 backdrop-blur-sm p-8 md:p-16 relative shadow-2xl shadow-wedding-gold/5 border border-wedding-gold/10">
          <CornerOrnaments />
          <Reveal className="text-center mb-16">
            <div className="w-28 h-28 mx-auto mb-10 rounded-full bg-wedding-primary flex items-center justify-center shadow-xl shadow-wedding-gold/20 relative">
              <div className="absolute inset-1 rounded-full border border-wedding-gold/60 border-dashed"></div>
              <span className="font-display text-4xl text-wedding-bg tracking-wider">AS</span>
            </div>
            
            <h2 className="tracking-[0.25em] text-sm md:text-base uppercase mb-8 font-display text-wedding-gold">Wedding Invitation</h2>
            
            <h1 className="font-script text-6xl md:text-8xl text-wedding-primary mb-6 leading-tight">
              G. Aravind Kumar <span className="text-2xl md:text-3xl font-serif text-wedding-gold ml-1">M.E.,</span><br />
              <span className="text-3xl md:text-5xl text-wedding-gold my-4 block">weds</span>
              S. Swetha <span className="text-2xl md:text-3xl font-serif text-wedding-gold ml-1">B.E.,</span>
            </h1>
            
            <p className="tracking-[0.1em] text-lg mt-8 uppercase font-semibold text-wedding-primary/80">4th June 2026 - Thursday</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-20">
            <div className="flex items-center justify-center mb-10 opacity-70">
              <div className="h-[1px] w-24 bg-wedding-gold"></div>
              <p className="mx-4 font-tamil text-xl text-wedding-primary font-bold">தங்கள் நல்வரவை விரும்பும்</p>
              <div className="h-[1px] w-24 bg-wedding-gold"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 font-tamil text-sm md:text-base leading-loose text-center md:text-left">
              <div className="space-y-4">
                <h3 className="text-wedding-primary font-bold text-lg mb-4 text-center">மணமகன் வீட்டார்</h3>
                <p><span className="text-wedding-gold font-bold">தாய்மாமன் - அத்தை :</span><br/>திரு. P. சக்திவேல் MBA., - திருமதி. S. ரேவதி MBA.,</p>
                <p><span className="text-wedding-gold font-bold">மழலைகள் :</span> S. ருவந்திகா, S. அத்விகா</p>
                <p><span className="text-wedding-gold font-bold">பாட்டிமார்கள்</span><br/>திருமதி. ராஜம்மாள் பழனிச்சாமி<br/>திருமதி. குழந்தையம்மாள் ரங்கநாதன்</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-wedding-primary font-bold text-lg mb-4 text-center">மணமகள் வீட்டார்</h3>
                <p><span className="text-wedding-gold font-bold">தாய்மாமன்மார்கள் - அத்தைகள் :</span><br/>திரு. C. கிருஷ்ணமூர்த்தி - திருமதி. K. சுமதி<br/>திரு. C. நந்தகுமார் - திருமதி. N. தேவி</p>
                <p><span className="text-wedding-gold font-bold">பெரியப்பா - பெரியம்மா</span><br/>திரு. M. சண்முகம் - தெய்வத்திருமதி. S. விஜயலட்சுமி</p>
                <p><span className="text-wedding-gold font-bold">சித்தப்பா - சித்தி</span><br/>திரு. R. செந்தில் பிரபு MCA., - திருமதி. S. சர்மிளா தேவி M.E., Ph.d.,<br/>S. நிஸ்றித்தா, S. மிர்துள்</p>
                <p><span className="text-wedding-gold font-bold">அத்தை - மாமா</span><br/>Er. திரு. K. குமார் சம்பத் B.Tech., - திருமதி. K. கலைவாணி<br/>K.K. சமிக்ஷா B.Tech., K.K. கிஷோர்</p>
              </div>
            </div>
            
            <div className="mt-12 text-center font-tamil text-lg font-bold text-wedding-primary">
              <p>மற்றும்</p>
              <p className="text-wedding-gold mt-2">இனிய உறவுகளும் - இணைபிரியா நட்புகளும்</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Page 2 (Main Invitations - English & Tamil) */}
      <section className="w-full flex py-20 px-4 md:px-8 items-center justify-center border-b border-wedding-gold/20">
        <div className="w-full max-w-4xl bg-white/80 p-8 md:p-16 relative shadow-xl border border-wedding-primary/5">
          <CornerOrnaments />
          
          {/* English Section */}
          <Reveal className="text-center pb-20 border-b border-wedding-gold/30">
            <h2 className="font-display text-2xl md:text-3xl text-wedding-primary mb-8 tracking-widest font-bold">Wedding Invitation</h2>
            
            <p className="text-sm md:text-base uppercase tracking-[0.1em] font-semibold text-wedding-primary/90 mb-6">
              Mr. R. Gurusamy - Mrs. G. Kousalya<br/>
              <span className="text-wedding-gold italic lowercase text-sm my-2 block font-normal">and</span>
              Mr. R. Selvakumar - Mrs. S. Vasanthi
            </p>
            
            <p className="text-lg md:text-xl italic mb-10 max-w-2xl mx-auto leading-relaxed">
              Cordially solicit your gracious presence with your family and friends on the auspicious occasion of the wedding of
            </p>

            <h2 className="font-script text-5xl md:text-7xl text-wedding-primary mb-2">G. Aravind Kumar <span className="font-serif text-sm md:text-base not-italic text-wedding-gold ml-1 tracking-normal">M.E.,</span></h2>
            <p className="italic text-wedding-gold my-4 text-xl">with</p>
            <h2 className="font-script text-5xl md:text-7xl text-wedding-primary mb-10">S. Swetha <span className="font-serif text-sm md:text-base not-italic text-wedding-gold ml-1 tracking-normal">B.E.,</span></h2>

            <div className="space-y-4">
              <p className="text-base md:text-lg tracking-wide uppercase font-semibold">
                On Thursday the 4th June 2026, <span className="lowercase italic font-normal text-sm text-wedding-gold mx-1">between</span> 4:30 am <span className="lowercase italic font-normal text-sm text-wedding-gold mx-1">and</span> 6:00 am
              </p>
              <p className="text-lg md:text-xl font-display font-semibold">
                <span className="italic text-wedding-gold lowercase font-normal text-base mr-2">at</span>
                Velavan Mahal, <span className="text-base tracking-wide font-normal">Karumathampatti</span>
              </p>
              <div className="pt-4 flex items-center justify-center">
                <div className="w-16 h-[1px] bg-wedding-gold/50 mx-4"></div>
                <p className="uppercase tracking-[0.15em] text-sm">Reception</p>
                <div className="w-16 h-[1px] bg-wedding-gold/50 mx-4"></div>
              </div>
              <p className="italic text-sm">03.06.2026 Wednesday between 6:00 pm and 9:00 pm</p>
            </div>
            
            <div className="mt-12 w-16 h-16 mx-auto bg-wedding-primary/5 rounded-full flex items-center justify-center relative">
               <div className="absolute inset-2 border border-wedding-gold/40 rounded-full"></div>
            </div>
            <p className="mt-4 italic text-sm">With best compliments from</p>
            <p className="font-display tracking-[0.1em] text-wedding-primary">Friends & Relatives</p>
          </Reveal>

          {/* Tamil Section */}
          <Reveal delay={0.2} className="pt-20 text-center font-tamil">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-wedding-primary/70 mb-10">
              <span>ஸ்ரீ வரதராஜப்பெருமாள் துணை</span>
              <span className="hidden md:inline">•</span>
              <span>ஸ்ரீ மாகாளியம்மன் துணை</span>
              <span className="hidden md:inline">•</span>
              <span>ஸ்ரீ கன்னிமார் கருப்பராயன் துணை</span>
            </div>

            <h2 className="text-3xl md:text-4xl text-wedding-primary font-bold mb-8">திருமண அழைப்பிதழ்</h2>
            
            <p className="text-left font-bold mb-4">அன்புடையீர்,</p>
            <p className="text-justify leading-relaxed mb-10 text-sm md:text-base">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;நிகழும் மங்களகரமான பராபவ வருடம் வைகாசி மாதம் 21-ம் நாள் (04.06.2026) வியாழக்கிழமை சதுர்த்தி திதியும், உத்திராட நட்சத்திரமும், சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் காலை 4.30 மணிக்குமேல் 6.00 மணிக்குள் ரிஷப லக்னத்தில்
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 text-center border-t border-b border-wedding-gold/20 py-8 relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-wedding-gold/20 -translate-x-1/2"></div>
              
              <div className="space-y-2 text-sm leading-relaxed">
                <p>கோவை, கணபதி, உடையாம்பாளையம்,</p>
                <p>தெய்வத்திருவாளர்கள். A. ராமசாமி - R. வேலாத்தாள்</p>
                <p>ஆகியோர் மகனவழிப்பேரனும், சாய்பாபாகாலனி,</p>
                <p>திரு. பழனிச்சாமி - திருமதி. வெங்கிட்டம்மாள்</p>
                <p>ஆகியோர் மகளவழிப்பேரனும்,</p>
                <p>திரு. R. குருசாமி - திருமதி. G. கௌசல்யா அகியோர் புதல்வனுமாகிய</p>
                <h3 className="text-xl font-bold text-wedding-primary mt-4">G. அரவிந்த்குமார் <span className="text-sm font-normal text-wedding-gold ml-1">M.E.,</span></h3>
                <p className="text-xs text-wedding-gold">(NeoSOFT, Chennai)</p>
              </div>

              <div className="space-y-2 text-sm leading-relaxed mt-8 md:mt-0">
                <p>சோமனூர்,</p>
                <p>திரு. R. ரங்கசாமி - திருமதி. R. ருக்மணி</p>
                <p>அவர்கள் மகளவழிப்பேத்தியும், கோவை, இராமநாதபுரம்,</p>
                <p>தெய்வத்திருவாளர்கள். P. சின்னசாமி - C. கமலம்மாள்</p>
                <p>ஆகியோர் மகளவழிப்பேத்தியும்,</p>
                <p>திரு. R. செல்வகுமார் - திருமதி. S. வசந்தி அகியோர் புதல்வியுமாகிய</p>
                <p className="text-xs">செல்வி</p>
                <h3 className="text-xl font-bold text-wedding-primary mt-2">S. சுவேதா <span className="text-sm font-normal text-wedding-gold ml-1">B.E.,</span></h3>
              </div>
            </div>

            <p className="text-center leading-relaxed text-sm md:text-base mb-16">
              ஆகியோரது திருமணம் பெரியோர்களால் நிச்சயிக்கப்பட்டு மேற்படி திருமணம் <span className="font-bold text-wedding-primary">கருமத்தம்பட்டி, வேலவன் மஹாலில்</span> நடைபெற இருப்பதால் தாங்கள் தங்கள் சுற்றமும் நட்பும் சூழ வருகைதந்து மணமக்களை வாழ்த்தியருள அன்புடன் அழைக்கின்றோம்.
            </p>

            <h4 className="text-wedding-primary font-bold text-lg mb-8">தங்கள் அன்புள்ள</h4>
            <div className="grid md:grid-cols-2 gap-8 text-left text-sm relative">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-wedding-gold/10 -translate-x-1/2"></div>
              
              <div className="space-y-2">
                <p className="font-bold text-wedding-primary">திரு. R. செல்வகுமார் - திருமதி. S. வசந்தி</p>
                <p className="text-xs text-wedding-gold mb-2">(Sri Swetha Builders)</p>
                <p className="font-bold text-wedding-gold">அண்ணன்</p>
                <p><span className="font-bold text-wedding-primary">S. பிரதீப்</span> B.E.,(Civil)</p>
                <p className="text-xs text-wedding-gold">(Blue J Construction)</p>
                <p>சோமனூர்</p>
                <p>செல் : 97900 14814, 87546 14814</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-wedding-primary">திரு. R. குருசாமி - திருமதி. G. கௌசல்யா</p>
                <p className="text-xs text-wedding-gold mb-2">(மில்ஸ் கான்ட்ராக்டர்)</p>
                <p className="font-bold text-wedding-gold">தங்கை - மச்சான்</p>
                <p><span className="font-bold text-wedding-primary">திரு. P. கார்த்திக்</span> B.Com (CA)., - <span className="font-bold text-wedding-primary">திருமதி. G. ஐஸ்வர்யா</span> B.Com.,</p>
                <p>பாரதிபுரம்</p>
                <p>செல் : 80127 74013, 84281 60203</p>
              </div>
            </div>
            
            <p className="text-center text-xs mt-12 text-wedding-primary/60 font-semibold">(இரு இல்ல அழைப்பு)</p>
          </Reveal>
        </div>
      </section>

      {/* Page 4 (Events Tracker) Moved before envelope logic to balance scrolling */}
      <section className="w-full py-20 px-4 md:px-8 flex items-center justify-center border-b border-wedding-gold/20">
        <div className="w-full max-w-4xl bg-white/70 p-8 md:p-16 relative shadow-lg">
          <CornerOrnaments />
          <Reveal className="text-center font-tamil">
            <div className="flex items-center justify-center mb-16">
              <div className="h-[1px] w-16 bg-wedding-gold"></div>
              <h2 className="text-2xl md:text-3xl text-wedding-primary font-bold mx-6">நிகழ்ச்சி நிரல்</h2>
              <div className="h-[1px] w-16 bg-wedding-gold"></div>
            </div>

            <div className="max-w-2xl mx-auto border border-wedding-gold/20 p-8 rounded-sm bg-white/40">
              <div className="mb-12 relative">
                <h3 className="text-sm md:text-lg font-bold text-wedding-primary inline-block bg-wedding-bg/80 px-4 md:px-6 py-2 rounded-xl border border-wedding-gold/20 mb-8">
                  <span className="text-wedding-gold">03.06.2026</span>
                  <span className="mx-2">-</span>
                  <span>புதன்கிழமை</span>
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 text-sm">
                  <div className="space-y-2">
                    <p className="font-bold text-wedding-primary">மாப்பிள்ளை அழைப்பு</p>
                    <p className="text-wedding-primary/80">மாலை 4:00 - 6:00 மணி</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-wedding-gold">வரவேற்பு</p>
                    <p className="text-wedding-primary/80">மாலை 6:00 - 9:00 மணி</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-wedding-primary">நிச்சயதார்த்தம்</p>
                    <p className="text-wedding-primary/80">இரவு 9:00 - 10:00 மணி</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <h3 className="text-sm md:text-lg font-bold text-wedding-primary inline-block bg-wedding-bg/80 px-4 md:px-6 py-2 rounded-xl border border-wedding-gold/20 mb-8">
                  <span className="text-wedding-gold">04.06.2026</span>
                  <span className="mx-2">-</span>
                  <span>வியாழக்கிழமை</span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-2">
                    <p className="font-bold text-wedding-gold text-lg">சுபமுகூர்த்தம்</p>
                    <p className="text-wedding-primary/80">காலை 4:30 - 6:00 மணி</p>
                  </div>
                  <div className="space-y-2 pt-1 md:pt-0">
                    <p className="font-bold text-wedding-primary">சம்பந்தி விருந்து</p>
                    <p className="text-wedding-primary/80">மதியம் 12:00 மணி முதல்</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-12 text-lg font-bold text-wedding-primary tracking-wide">
              நிகழிடம்: வேலவன் மஹால், கருமத்தம்பட்டி
            </p>
          </Reveal>
        </div>
      </section>

      {/* Page 3 (Envelope Back) */}
      <section className="w-full min-h-[70vh] py-20 px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-wedding-primary/5 p-8 md:p-16 relative border border-wedding-gold/10">
          <CornerOrnaments />
          <Reveal className="text-center font-tamil">
            <div className="w-32 h-32 mx-auto mb-16 rounded-full border border-wedding-gold/30 flex items-center justify-center relative bg-white/50">
              <span className="font-display text-5xl text-wedding-gold tracking-widest">AS</span>
            </div>

            <h2 className="text-3xl text-wedding-primary font-bold mb-4">திருமண அழைப்பிதழ்</h2>
            <p className="text-wedding-gold font-bold mb-10 tracking-widest text-sm">04.06.2026 - வியாழக்கிழமை</p>

            <h3 className="font-script text-4xl text-wedding-primary mb-2 mt-16">G. அரவிந்த்குமார் <span className="font-serif text-sm font-normal text-wedding-gold ml-1">M.E.,</span></h3>
            <div className="my-2">
              <span className="text-wedding-gold">|</span>
            </div>
            <h3 className="font-script text-4xl text-wedding-primary mb-8 text-center">S. சுவேதா <span className="font-serif text-sm font-normal text-wedding-gold ml-1">B.E.,</span></h3>

            <p className="text-sm font-semibold text-wedding-primary/80 tracking-wide">
              நிகழிடம்: வேலவன் மஹால், கருமத்தம்பட்டி
            </p>
            
            <div className="mt-16 flex justify-center">
              <img src="https://www.transparenttextures.com/patterns/arabesque.png" alt="" className="w-24 h-24 opacity-10 absolute pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

