import React, { useState } from 'react';
import axios from 'axios';
import { 
  Trophy, 
  Calendar, 
  UserCheck, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Send 
} from 'lucide-react';

/*const API_BASE_URL = 'http://localhost/api';*/
const API_BASE_URL = 'https://mozso.moriczcloud.hu/api';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    school_name: '',
    teacher_name: '',
    teacher_email: '',
    teacher_phone: '',
    team_name: '',
    member1_name: '',
    member2_name: '',
    member3_name: '',
    team_email: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({
        school_name: '',
        teacher_name: '',
        teacher_email: '',
        teacher_phone: '',
        team_name: '',
        member1_name: '',
        member2_name: '',
        member3_name: '',
        team_email: ''
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setStatus({ type: 'error', message: firstError });
      } else {
        setStatus({ type: 'error', message: 'Hiba történt a regisztráció során. Próbáld újra később!' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Fejléc / Navigáció */}
    <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Kattintható logó és évszám -> Főoldalra navigál */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <span className="text-2xl font-black tracking-wider text-cyan-400 group-hover:text-cyan-300 transition">
            #DigitSkills
          </span>
          <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800">
            2026
          </span>
        </button>

        <nav className="flex flex-wrap items-center gap-2 md:gap-4 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'tasks' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
          >
            Korábbi feladatok
          </button>

          <button 
            onClick={() => setActiveTab('winners')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'winners' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-700 text-slate-300'}`}
          >
            Korábbi helyezettek
          </button>

          {/* Kiemelt Jelentkezés gomb */}
          <button 
            onClick={() => setActiveTab('register')}
            className={`px-4 py-1.5 rounded-lg font-semibold transition shadow-md ${
              activeTab === 'register' 
                ? 'bg-green-400 text-slate-900 ring-2 ring-green-300' 
                : 'bg-green-500 hover:bg-green-400 text-slate-950'
            }`}
          >
            Jelentkezés
          </button>
        </nav>
      </div>
    </header>

      {/* Fő tartalom */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* FŐOLDAL SZEKCIÓ */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Banner */}
            <div className="text-center space-y-4 py-8 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              <h1 className="text-3xl md:text-5xl leading-tight font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
                #DigitSkills csapatverseny
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Szakértői digitális kultúra csapatverseny 8. osztályos tanulók számára.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => setActiveTab('register')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <Send className="w-5 h-5" /> Jelentkezés a versenyre
                </button>
                <a 
                  href="https://moricz.arrabonus.hu/moodle2/course/view.php?id=81" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 text-cyan-300 font-semibold px-6 py-3 rounded-xl border border-cyan-500/30 transition flex items-center gap-2"
                >
                  Belépés a Moodle felületre <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Részletek kártyák */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-3 text-cyan-400 font-bold text-lg">
                  <UserCheck className="w-6 h-6" />
                  <span>Célcsoport</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A versenyre <strong>8. osztályos tanulókból álló 3 fős csapatok</strong> jelentkezését várjuk.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  A verseny szakértői jellegű: minden csapattag egy-egy kijelölt digitális területre specializálódik (<strong>Word, PowerPoint, Micro:bit</strong>).
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-3 text-teal-400 font-bold text-lg">
                  <Trophy className="w-6 h-6" />
                  <span>Díjazás</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Az 1–3. helyezett csapatok értékes tárgyi jutalomban részesülnek, valamint minden döntős csapattag és felkészítő tanár elismerő oklevelet kap.
                </p>
              </div>
            </div>

            {/* Ütemterv / Dátumok */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" /> Versenykiírás és menetrend
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700/60">
                  <span className="text-xs text-cyan-400 font-bold uppercase">1. Lépés</span>
                  <h3 className="font-semibold text-lg text-slate-200">Regisztráció</h3>
                  <p className="text-sm text-slate-400 mt-1">Határidő: <strong>2026. november 06.</strong></p>
                  <p className="text-xs text-slate-500 mt-2">Az online jelentkezési lap kitöltésével.</p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700/60">
                  <span className="text-xs text-teal-400 font-bold uppercase">I. forduló</span>
                  <h3 className="font-semibold text-lg text-slate-200">Online Moodle teszt</h3>
                  <p className="text-sm text-slate-400 mt-1">Határidő: <strong>2026. november 08.</strong></p>
                  <p className="text-xs text-slate-500 mt-2">Értékelés: pontosság és megoldási idő alapján.</p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700/60">
                  <span className="text-xs text-amber-400 font-bold uppercase">II. forduló</span>
                  <h3 className="font-semibold text-lg text-slate-200">Helyszíni döntő</h3>
                  <p className="text-sm text-slate-400 mt-1">Dátum: <strong>2026. november 17.</strong></p>
                  <p className="text-xs text-slate-500 mt-2">A legjobb 6 csapat számára a Móriczban.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGEBBI FELADATOK SZEKCIÓ */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400">Korábbi évek versenyfeladatai</h2>
            <p className="text-slate-400 text-sm">Töltsd le az előző évek feladatsorait a felkészüléshez!</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold">2025. évi I. forduló - Moodle teszt mintafeladatok</h3>
                    <span className="text-xs text-slate-400">PDF • 1.0 MB</span>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1CXmRbc6ok8HHdSnkaWJzAcOHwmHSu5Mo/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-xs font-medium"
                >
                  Letöltés
                </a>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h3 className="font-semibold">2025. évi II. forduló - Gyakorlati feladatsor</h3>
                    <span className="text-xs text-slate-400">ZIP • 0.7 MB</span>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1cY7KpAz1hWf_yxHLIrYMsBU-G-hBoP5k/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-xs font-medium"
                >
                  Letöltés
                </a>
              </div>
            </div>
          </div>
        )}

        {/* HELYEZETTEK SZEKCIÓ */}
        {activeTab === 'winners' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400">Korábbi évek helyezettjei</h2>
            
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-6 py-3 font-semibold text-slate-200">2025. évi eredménylista</div>
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Helyezés</th>
                    <th className="px-6 py-3">Csapatnév</th>
                    <th className="px-6 py-3">Intézmény</th>
                    <th className="px-6 py-3">Felkészítő tanár</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-bold text-amber-400">🥇 1. Helyezett</td>
                    <td className="px-6 py-4 font-semibold">Trükkös trió</td>
                    <td className="px-6 py-4">Arany János Általános Iskola</td>
                    <td className="px-6 py-4">Tuka Antal</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-bold text-slate-300">🥈 2. Helyezett</td>
                    <td className="px-6 py-4 font-semibold">navi</td>
                    <td className="px-6 py-4">Arany János Általános Iskola</td>
                    <td className="px-6 py-4">Tuka Antal</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-bold text-amber-600">🥉 3. Helyezett</td>
                    <td className="px-6 py-4 font-semibold">Nyolcad</td>
                    <td className="px-6 py-4">Nagyhegyesi Veres Péter Általános Iskola</td>
                    <td className="px-6 py-4">Haranginé Szabó Tünde</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* JELENTKEZÉSI ŰRLAP SZEKCIÓ */}
        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-cyan-400">Jelentkezési űrlap</h2>
              <p className="text-sm text-slate-400">Töltsd ki az alábbi adatokat a csapat regisztrációjához!</p>
            </div>

            {status.message && (
              <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200' : 'bg-rose-950/80 border border-rose-700 text-rose-200'}`}>
                {status.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <p className="text-sm">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
              
              {/* Intézményi adatok */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">1. Intézmény adatai</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Intézmény neve *</label>
                  <input 
                    type="text" 
                    name="school_name"
                    required
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="Pl. Móricz Zsigmond Református Kollégium"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Felkészítő tanár */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">2. Felkészítő tanár adatai</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Felkészítő tanár neve *</label>
                  <input 
                    type="text" 
                    name="teacher_name"
                    required
                    value={formData.teacher_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Email-cím *</label>
                    <input 
                      type="email" 
                      name="teacher_email"
                      required
                      value={formData.teacher_email}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Telefonszám *</label>
                    <input 
                      type="tel" 
                      name="teacher_phone"
                      required
                      value={formData.teacher_phone}
                      onChange={handleChange}
                      placeholder="+36 30 123 4567"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Csapat adatok */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-200 border-b border-slate-700 pb-2">3. Csapat adatai</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Csapatnév *</label>
                  <input 
                    type="text" 
                    name="team_name"
                    required
                    value={formData.team_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">1. Csapattag neve *</label>
                  <input 
                    type="text" 
                    name="member1_name"
                    required
                    value={formData.member1_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">2. Csapattag neve *</label>
                  <input 
                    type="text" 
                    name="member2_name"
                    required
                    value={formData.member2_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">3. Csapattag neve *</label>
                  <input 
                    type="text" 
                    name="member3_name"
                    required
                    value={formData.member3_name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Közös "csapat" e-mail cím (Moodle regisztrációhoz) *</label>
                  <input 
                    type="email" 
                    name="team_email"
                    required
                    value={formData.team_email}
                    onChange={handleChange}
                    placeholder="csapatnev@iskola.hu"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                {loading ? 'Beküldés folyamatban...' : 'Regisztráció beküldése'}
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Lábléc */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-12 py-6 text-center text-xs text-slate-400">
        <p>Móricz Zsigmond Református Kollégium, Gimnázium, Technikum, Általános Iskola és Óvoda</p>
        <p className="mt-1">Kapcsolat: <a href="mailto:digitskills@moriczref.hu" className="text-cyan-400 underline">digitskills@moriczref.hu</a></p>
      </footer>
    </div>
  );
}