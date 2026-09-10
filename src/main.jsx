import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, Award, BadgeCheck, Check, CheckCircle2,
  ChevronDown, CircleHelp, Compass, Copy, Edit3, Eye, EyeOff,
  FileCheck2, FileText, Fingerprint, Flame, GraduationCap, Hash,
  HeartHandshake, Layers, Lock, LogIn, LogOut, Mail, MapPin, Moon,
  Phone, Radio, Save, ShieldAlert, ShieldCheck, Smartphone, Sparkles,
  Sun, User, UserCheck, UserRound, Users, X, Zap
} from 'lucide-react';
import './styles.css';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: Fingerprint, kicker: '01' },
  { id: 'contact', label: 'Contact', icon: Radio, kicker: '02' },
  { id: 'academic', label: 'Academic', icon: Award, kicker: '03' },
  { id: 'course', label: 'Course', icon: Layers, kicker: '04' },
  { id: 'parent', label: 'Parent', icon: ShieldCheck, kicker: '05' },
  { id: 'terms', label: 'Terms', icon: FileCheck2, kicker: '06' }
];

const STATES = ['Andhra Pradesh','Telangana','Tamil Nadu','Karnataka','Kerala','Maharashtra','Delhi','Other'];
const YEARS = ['2022','2023','2024','2025','2026','2027'];

const EMPTY = {
  photo: '', fullName: '', dob: '', gender: '', bloodGroup: '', idNumber: '', nationality: 'Indian', category: '',
  email: '', mobile: '', alternatePhone: '', address: '', city: '', state: '', pin: '',
  school10: '', percent10: '', year10: '', college12: '', percent12: '', year12: '', entrance: '',
  application: '', course: '', academicYear: '2026–27', admissionType: '', specialization: '',
  father: '', mother: '', guardian: '', occupation: '', parentMobile: '', income: '', terms: false
};

const DEMO_STUDENT = {
  photo: '', fullName: 'Aarav Sharma', dob: '2005-06-15', gender: 'Male', bloodGroup: 'O+',
  idNumber: '784938291048', nationality: 'Indian', category: 'General',
  email: 'aarav.sharma@eduverse.ac.in', mobile: '9876543210', alternatePhone: '9876500000',
  address: '42 Silicon Boulevard, HITEC City', city: 'Hyderabad', state: 'Telangana', pin: '500081',
  school10: 'Delhi Public School', percent10: '94.8%', year10: '2022',
  college12: 'Apex Junior College', percent12: '96.2%', year12: '2024',
  entrance: 'JEE Mains (Score: 98.4%)',
  application: 'EDU-APP-2026-904', course: 'B.Tech — Computer Science',
  academicYear: '2026–27', admissionType: 'Merit', specialization: 'Artificial Intelligence & Machine Learning',
  father: 'Rajesh Sharma', mother: 'Sunita Sharma', guardian: '', occupation: 'Senior Architect',
  parentMobile: '9848012345', income: '₹10–20 Lakhs', terms: true
};

function App() {
  const [view, setView] = useState('register'); // 'register' | 'login' | 'portal' | 'edit'
  const [step, setStep] = useState(0);
  const [data, setData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('eduverse-form'));
      return saved && saved.fullName ? saved : DEMO_STUDENT;
    } catch {
      return DEMO_STUDENT;
    }
  });

  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('eduverse-auth')) || { isLoggedIn: false, user: null };
    } catch {
      return { isLoggedIn: false, user: null };
    }
  });

  const [dark, setDark] = useState(() => localStorage.getItem('eduverse-theme') !== 'light');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState(() => localStorage.getItem('eduverse-reg-id') || 'EDU-2026-784920');

  useEffect(() => { localStorage.setItem('eduverse-form', JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem('eduverse-auth', JSON.stringify(auth)); }, [auth]);
  useEffect(() => { localStorage.setItem('eduverse-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { localStorage.setItem('eduverse-reg-id', registrationId); }, [registrationId]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const update = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = (index) => {
    const e = {};
    const required = (key, message) => { if (!String(data[key] ?? '').trim()) e[key] = message; };
    if (index === 0) {
      required('fullName','Full name is required.'); required('dob','Date of birth is required.');
      required('gender','Select a gender.'); required('bloodGroup','Select a blood group.'); required('idNumber','ID number is required.');
      required('category','Select a category.');
      if (data.idNumber && !/^\d{4,16}$/.test(data.idNumber.replace(/\s/g,''))) e.idNumber = 'Enter a valid numeric ID (4–16 digits).';
    }
    if (index === 1) {
      required('email','Email address is required.'); required('mobile','Mobile number is required.'); required('address','Address is required.');
      required('city','City is required.'); required('state','Select a state.'); required('pin','PIN code is required.');
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Enter a valid email address.';
      if (data.mobile && !/^\d{10}$/.test(data.mobile.replace(/\D/g,''))) e.mobile = 'Enter a 10-digit mobile number.';
      if (data.pin && !/^\d{6}$/.test(data.pin.replace(/\D/g,''))) e.pin = 'Enter a 6-digit PIN code.';
    }
    if (index === 2) {
      required('school10','10th school name is required.'); required('percent10','10th percentage / CGPA is required.'); required('year10','10th passing year is required.');
      required('college12','12th college name is required.'); required('percent12','12th percentage / CGPA is required.'); required('year12','12th passing year is required.');
    }
    if (index === 3) {
      required('application','Application number is required.'); required('course','Select a course / branch.'); required('academicYear','Select academic year.'); required('admissionType','Select admission type.'); required('specialization','Select a specialization.');
    }
    if (index === 4) {
      required('father',"Father's name is required."); required('mother',"Mother's name is required."); required('occupation','Parent occupation is required.'); required('parentMobile','Parent mobile number is required.'); required('income','Select annual family income.');
      if (data.parentMobile && !/^\d{10}$/.test(data.parentMobile.replace(/\D/g,''))) e.parentMobile = 'Enter a 10-digit mobile number.';
    }
    if (index === 5 && !data.terms) e.terms = 'You must accept the Terms and Conditions.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validate(step)) {
      setStep(s => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setToast('Please complete all highlighted fields.');
    }
  };

  const goBack = () => {
    setErrors({});
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jump = (i) => {
    if (i <= step) {
      setErrors({});
      setStep(i);
    }
  };

  const submit = () => {
    if (!validate(5)) { setToast('Please accept the Terms and Conditions.'); return; }
    const id = `EDU-${new Date().getFullYear()}-${Math.floor(100000 + Math.random()*900000)}`;
    setRegistrationId(id);
    setSubmitted(true);
    setAuth({ isLoggedIn: true, user: data.fullName || 'Student Candidate', email: data.email, id });
  };

  const reset = () => {
    setData(EMPTY);
    setStep(0);
    setErrors({});
    setSubmitted(false);
    setView('register');
  };

  const handleLoginSuccess = (loginData) => {
    setAuth({ isLoggedIn: true, user: data.fullName || 'Aarav Sharma', email: loginData.identifier, id: registrationId });
    setView('portal');
    setToast('Logged in successfully! Welcome to your student portal.');
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
    setView('login');
    setToast('You have been logged out.');
  };

  const handleSaveEdits = () => {
    setToast('Registration details updated successfully! Status: Registration Successful.');
    setView('portal');
  };

  return (
    <div className={`app ${dark ? 'dark' : 'light'}`}>
      <Ambient />

      {/* Topbar Navigation */}
      <header className="topbar">
        <div className="brand" onClick={() => setView(auth.isLoggedIn ? 'portal' : 'register')}>
          <div className="brand-mark">
            <GraduationCap size={22} className="brand-cap"/>
            <span className="brand-pulse" />
          </div>
          <div>
            <div className="brand-title-wrap">
              <strong>Student registration form</strong>
              <span className="hype-badge">v2.5</span>
            </div>
            <small>EduVerse Academic Portal • Admissions 2026–27</small>
          </div>
        </div>

        {/* View Switcher */}
        <div className="nav-links">
          <button
            className={`nav-link ${view === 'register' ? 'active' : ''}`}
            onClick={() => { setView('register'); setSubmitted(false); }}
          >
            <Fingerprint size={15}/> New Registration
          </button>
          
          {auth.isLoggedIn ? (
            <button
              className={`nav-link ${view === 'portal' || view === 'edit' ? 'active' : ''}`}
              onClick={() => setView('portal')}
            >
              <BadgeCheck size={15}/> Student Portal
            </button>
          ) : (
            <button
              className={`nav-link ${view === 'login' ? 'active' : ''}`}
              onClick={() => setView('login')}
            >
              <LogIn size={15}/> Student Login
            </button>
          )}
        </div>

        <div className="top-actions">
          {auth.isLoggedIn ? (
            <div className="user-badge">
              <User size={14}/>
              <span>{auth.user || 'Student'}</span>
              <button
                onClick={handleLogout}
                title="Logout"
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '6px' }}
              >
                <LogOut size={14}/>
              </button>
            </div>
          ) : (
            <div className="telemetry-pill">
              <span className="live-dot" />
              <span className="live-text">PORTAL ONLINE</span>
            </div>
          )}

          <button className="theme-btn" onClick={() => setDark(v => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {view === 'login' && (
        <LoginView
          onLogin={handleLoginSuccess}
          onSwitchToRegister={() => setView('register')}
          demoData={data}
        />
      )}

      {view === 'portal' && (
        <StudentPortal
          data={data}
          registrationId={registrationId}
          onEdit={() => setView('edit')}
          onLogout={handleLogout}
        />
      )}

      {view === 'edit' && (
        <EditRegistrationView
          data={data}
          update={update}
          errors={errors}
          onSave={handleSaveEdits}
          onCancel={() => setView('portal')}
        />
      )}

      {view === 'register' && (
        submitted ? (
          <Success
            dark={dark}
            id={registrationId}
            name={data.fullName}
            data={data}
            reset={reset}
            goToPortal={() => setView('portal')}
          />
        ) : (
          <div className="layout">
            <aside className="sidebar">
              <div className="side-caption">
                <Compass size={11} className="caption-icon" />
                <span>REGISTRATION JOURNEY</span>
              </div>
              <div className="side-step-list">
                {STEPS.map((s, i) => (
                  <StepNav
                    key={s.id}
                    item={s}
                    index={i}
                    active={step === i}
                    complete={i < step}
                    disabled={i > step}
                    onClick={() => jump(i)}
                  />
                ))}
              </div>

              <div className="side-status">
                <div className="status-icon"><Zap size={16}/></div>
                <div>
                  <strong>Instant Sync Active</strong>
                  <span>Progress cached locally in real-time.</span>
                </div>
              </div>

              <div className="side-quote">
                <div className="quote-mark">“</div>
                <span>Empowering future engineers and leaders with seamless registration.</span>
              </div>
            </aside>

            <main className="main">
              <Progress step={step} />

              <div className="card-shell">
                <div className="card-shine" />
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                <section className="form-card" key={STEPS[step].id}>
                  {step === 0 && <Personal data={data} update={update} errors={errors} />}
                  {step === 1 && <Contact data={data} update={update} errors={errors} />}
                  {step === 2 && <Academic data={data} update={update} errors={errors} />}
                  {step === 3 && <Course data={data} update={update} errors={errors} />}
                  {step === 4 && <Parent data={data} update={update} errors={errors} />}
                  {step === 5 && <Terms data={data} update={update} errors={errors} />}

                  <div className="form-footer">
                    <button className="secondary" onClick={goBack} disabled={step === 0}>
                      <ArrowLeft size={16}/> Back
                    </button>
                    {step < STEPS.length - 1 ? (
                      <button className="primary" onClick={goNext}>
                        <span>Continue</span> <ArrowRight size={16}/>
                      </button>
                    ) : (
                      <button className="primary submit" onClick={submit}>
                        <span>Register Student</span> <Flame size={17} className="flame-icon"/>
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </main>
          </div>
        )
      )}

      {/* Professional Footer (Policies & Terms Applied on every page) */}
      <SiteFooter />

      {toast && (
        <div className="toast">
          <CircleHelp size={16}/>
          <span>{toast}</span>
          <button onClick={() => setToast('')} aria-label="Close notification"><X size={14}/></button>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   Ambient Background with Blurry College Campus
   ========================================================================== */
function Ambient() {
  return (
    <>
      <div className="campus-backdrop" />
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="aurora aurora-three" />
      <div className="cyber-grid" />
      <div className="scanlines" />
    </>
  );
}

/* ==========================================================================
   Login View Component
   ========================================================================== */
function LoginView({ onLogin, onSwitchToRegister, demoData }) {
  const [identifier, setIdentifier] = useState(demoData.email || 'aarav.sharma@eduverse.ac.in');
  const [password, setPassword] = useState('EduVerse@2026');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) { setLoginError('Please enter your Registered Email or ID.'); return; }
    if (!password) { setLoginError('Please enter your password.'); return; }
    onLogin({ identifier });
  };

  const handleQuickDemo = () => {
    setIdentifier(demoData.email || 'aarav.sharma@eduverse.ac.in');
    setPassword('EduVerse@2026');
    onLogin({ identifier: demoData.email || 'aarav.sharma@eduverse.ac.in' });
  };

  return (
    <main className="login-screen">
      <div className="login-card">
        <div className="card-shine" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        <div className="login-icon-box">
          <Lock size={28}/>
        </div>

        <h2>Student Portal Login</h2>
        <p>Access your application status, inspect registration records, and edit details.</p>

        <button type="button" className="demo-login-pill" onClick={handleQuickDemo}>
          <Zap size={14}/>
          <span>One-Click Demo Student Sign In</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="field">
            <span className="field-label">Email or Registration ID <b>*</b></span>
            <div className="input-wrap">
              <input
                type="text"
                value={identifier}
                onChange={e => { setIdentifier(e.target.value); setLoginError(''); }}
                placeholder="e.g. student@eduverse.ac.in or EDU-2026-XXXXXX"
              />
              <Mail size={16} className="input-icon"/>
            </div>
          </div>

          <div className="field">
            <span className="field-label">Account Password <b>*</b></span>
            <div className="input-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                placeholder="Enter your portal password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'inherit', opacity: 0.6, cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {loginError && (
            <em className="terms-error"><ShieldAlert size={12}/> {loginError}</em>
          )}

          <button type="submit" className="primary login-submit">
            <span>Sign In to Student Portal</span>
            <ArrowRight size={16}/>
          </button>
        </form>

        <div className="login-switch">
          <span>New student candidate?</span>
          <button type="button" onClick={onSwitchToRegister}>Start Registration Form →</button>
        </div>
      </div>
    </main>
  );
}

/* ==========================================================================
   Student Portal & Status Dashboard
   ========================================================================== */
function StudentPortal({ data, registrationId, onEdit, onLogout }) {
  return (
    <main className="portal-wrap">
      {/* Hero Header */}
      <div className="portal-hero">
        <div className="card-shine" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Prominent Registration Status Card */}
        <div className="status-highlight-card">
          <div className="status-left">
            <div className="status-beacon">
              <CheckCircle2 size={32}/>
            </div>
            <div className="status-title-wrap">
              <span>OFFICIAL ADMISSION STATUS</span>
              <h2>Registration Status: Registration Successful</h2>
            </div>
          </div>

          <div className="status-badge-live">
            <span className="live-dot" />
            <span>VERIFIED & CONFIRMED</span>
          </div>
        </div>

        {/* Admission Pipeline Stepper */}
        <div className="pipeline-track">
          <div className="pipeline-step active">
            <div className="pipeline-icon"><Check size={16}/></div>
            <div>
              <strong>1. Form Submitted</strong>
              <span>Registration logged in official portal</span>
            </div>
          </div>
          <div className="pipeline-step active">
            <div className="pipeline-icon"><Check size={16}/></div>
            <div>
              <strong>2. Documents Verified</strong>
              <span>Academic credentials validated</span>
            </div>
          </div>
          <div className="pipeline-step active">
            <div className="pipeline-icon"><BadgeCheck size={16}/></div>
            <div>
              <strong>3. Admission Allocated</strong>
              <span>Ready for Academic Year 2026–27</span>
            </div>
          </div>
        </div>

        <div className="action-bar">
          <button className="primary" onClick={onEdit}>
            <Edit3 size={16}/>
            <span>Edit Registration Details</span>
          </button>
          <button className="secondary" onClick={() => window.print()}>
            <FileText size={16}/>
            <span>Print Application Slip</span>
          </button>
          <button className="secondary" onClick={onLogout} style={{ marginLeft: 'auto' }}>
            <LogOut size={16}/>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="portal-grid">
        {/* Personal & Biometrics */}
        <div className="portal-card">
          <div className="portal-card-head">
            <Fingerprint size={20}/>
            <h3>Personal Information</h3>
          </div>
          <div className="info-rows">
            <div className="info-row"><span>Student Name</span><strong>{data.fullName || '—'}</strong></div>
            <div className="info-row"><span>Official Reg ID</span><strong style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{registrationId}</strong></div>
            <div className="info-row"><span>Date of Birth</span><strong>{data.dob || '—'}</strong></div>
            <div className="info-row"><span>Gender & Blood Group</span><strong>{data.gender || '—'} ({data.bloodGroup || '—'})</strong></div>
            <div className="info-row"><span>ID / Aadhaar</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{data.idNumber || '—'}</strong></div>
            <div className="info-row"><span>Category</span><strong>{data.category || 'General'}</strong></div>
          </div>
        </div>

        {/* Contact & Residential */}
        <div className="portal-card">
          <div className="portal-card-head">
            <Radio size={20}/>
            <h3>Contact Telemetry</h3>
          </div>
          <div className="info-rows">
            <div className="info-row"><span>Email Address</span><strong>{data.email || '—'}</strong></div>
            <div className="info-row"><span>Mobile Number</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{data.mobile || '—'}</strong></div>
            <div className="info-row"><span>Alternate Contact</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{data.alternatePhone || 'None'}</strong></div>
            <div className="info-row"><span>City & State</span><strong>{data.city ? `${data.city}, ${data.state}` : '—'}</strong></div>
            <div className="info-row"><span>PIN Code</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{data.pin || '—'}</strong></div>
            <div className="info-row"><span>Street Address</span><strong>{data.address || '—'}</strong></div>
          </div>
        </div>

        {/* Academic Credentials */}
        <div className="portal-card">
          <div className="portal-card-head">
            <Award size={20}/>
            <h3>Academic Background</h3>
          </div>
          <div className="info-rows">
            <div className="info-row"><span>10th School</span><strong>{data.school10 || '—'}</strong></div>
            <div className="info-row"><span>10th Marks / Year</span><strong>{data.percent10 || '—'} ({data.year10 || '—'})</strong></div>
            <div className="info-row"><span>12th College</span><strong>{data.college12 || '—'}</strong></div>
            <div className="info-row"><span>12th Marks / Year</span><strong>{data.percent12 || '—'} ({data.year12 || '—'})</strong></div>
            <div className="info-row"><span>Entrance Exam</span><strong>{data.entrance || 'Direct Admission'}</strong></div>
          </div>
        </div>

        {/* Course & Parent Info */}
        <div className="portal-card">
          <div className="portal-card-head">
            <Layers size={20}/>
            <h3>Course & Guardian Record</h3>
          </div>
          <div className="info-rows">
            <div className="info-row"><span>Enrolled Course</span><strong style={{ color: 'var(--cyan)' }}>{data.course || 'B.Tech — Computer Science'}</strong></div>
            <div className="info-row"><span>Specialization</span><strong>{data.specialization || 'AI & Machine Learning'}</strong></div>
            <div className="info-row"><span>Batch / Year</span><strong>{data.academicYear || '2026–27'} ({data.admissionType || 'Merit'})</strong></div>
            <div className="info-row"><span>Parents' Names</span><strong>{data.father} & {data.mother}</strong></div>
            <div className="info-row"><span>Parent Mobile</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{data.parentMobile || '—'}</strong></div>
            <div className="info-row"><span>Family Income</span><strong>{data.income || '—'}</strong></div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ==========================================================================
   Edit Registration View Component
   ========================================================================== */
function EditRegistrationView({ data, update, errors, onSave, onCancel }) {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <main className="portal-wrap">
      <div className="form-card">
        <div className="card-shine" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        <div className="section-head">
          <div className="eyebrow">
            <Edit3 size={12}/>
            <span>STUDENT PROFILE MODIFICATION</span>
            <i/>
          </div>
          <h1>Edit Registration Details</h1>
          <p>Update your student registration information. Changes will be updated in real-time in your official institutional profile.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="edit-nav-pills">
          <button className={`edit-nav-pill ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
            01. Personal Info
          </button>
          <button className={`edit-nav-pill ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>
            02. Contact Details
          </button>
          <button className={`edit-nav-pill ${activeTab === 'academic' ? 'active' : ''}`} onClick={() => setActiveTab('academic')}>
            03. Academic Records
          </button>
          <button className={`edit-nav-pill ${activeTab === 'course' ? 'active' : ''}`} onClick={() => setActiveTab('course')}>
            04. Course & Branch
          </button>
          <button className={`edit-nav-pill ${activeTab === 'parent' ? 'active' : ''}`} onClick={() => setActiveTab('parent')}>
            05. Parent / Guardian
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '380px' }}>
          {activeTab === 'personal' && <Personal data={data} update={update} errors={errors} />}
          {activeTab === 'contact' && <Contact data={data} update={update} errors={errors} />}
          {activeTab === 'academic' && <Academic data={data} update={update} errors={errors} />}
          {activeTab === 'course' && <Course data={data} update={update} errors={errors} />}
          {activeTab === 'parent' && <Parent data={data} update={update} errors={errors} />}
        </div>

        <div className="form-footer">
          <button className="secondary" onClick={onCancel}>
            <ArrowLeft size={16}/> Cancel & Return
          </button>
          <button className="primary" onClick={onSave}>
            <Save size={16}/>
            <span>Save Registration Changes</span>
          </button>
        </div>
      </div>
    </main>
  );
}

/* ==========================================================================
   Professional Footer (Policies & Terms on every page)
   ========================================================================== */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <GraduationCap size={24} style={{ color: 'var(--cyan)' }}/>
            <div>
              <strong>EduVerse Institute of Higher Education & Technology</strong>
              <span>Autonomous Institution • NAAC 'A++' Grade • AICTE Approved</span>
            </div>
          </div>

          <div className="accreditation-badges">
            <span className="acc-badge"><ShieldCheck size={12}/> NAAC A++ ACCREDITED</span>
            <span className="acc-badge"><BadgeCheck size={12}/> AICTE & UGC RECOGNIZED</span>
            <span className="acc-badge"><Award size={12}/> NIRF TOP 50 RANKED</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Institutional Policies</h4>
            <ul>
              <li><a href="#terms"><FileCheck2 size={13}/> Terms & Conditions Applied</a></li>
              <li><a href="#privacy"><ShieldCheck size={13}/> Student Privacy & Data Policy</a></li>
              <li><a href="#antiragging"><ShieldAlert size={13}/> Anti-Ragging Mandatory Policy</a></li>
              <li><a href="#refund"><FileText size={13}/> Fee Structure & Refund Rules</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Admission Guidelines</h4>
            <ul>
              <li><a href="#criteria"><Compass size={13}/> Eligibility & Reservation Criteria</a></li>
              <li><a href="#verification"><BadgeCheck size={13}/> Certificate Verification Protocol</a></li>
              <li><a href="#scholarship"><Sparkles size={13}/> Merit Scholarships 2026–27</a></li>
              <li><a href="#hostel"><MapPin size={13}/> Campus & Hostel Rules</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Candidate Support</h4>
            <ul>
              <li><a href="#helpdesk"><CircleHelp size={13}/> Central Admissions Helpdesk</a></li>
              <li><a href="#grievance"><Mail size={13}/> Student Grievance Redressal</a></li>
              <li><a href="#helpline"><Phone size={13}/> Toll-Free Helpline: 1800-EDU-2026</a></li>
              <li><a href="#portal"><Zap size={13}/> Technical Support Cell</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Terms & Compliance Note</h4>
            <div className="footer-disclaimer">
              <strong>Important Notice:</strong> Terms & conditions applied to all admission applications. Provisional registration is subject to document scrutiny. Fictional / sample records must be used for classroom viva demonstration purposes.
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 EduVerse Higher Education Admissions. All Rights Reserved.</span>
          <div className="footer-legal-pills">
            <span>Terms of Admission Applied</span>
            <span>Privacy Compliance</span>
            <span>Institutional Governance</span>
            <span>Security Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   Wizard Sub-Components
   ========================================================================== */
function StepNav({ item, index, active, complete, disabled, onClick }) {
  const Icon = item.icon;
  return (
    <button className={`side-step ${active ? 'active' : ''} ${complete ? 'complete' : ''}`} disabled={disabled} onClick={onClick}>
      <span className="side-icon">
        {complete ? <Check size={15}/> : <Icon size={16}/>}
      </span>
      <span className="side-text">
        <b>STEP {item.kicker}</b>
        <span>{item.label}</span>
      </span>
      {active && <span className="active-pip" />}
    </button>
  );
}

function Progress({ step }) {
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-bar" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}>
          <span className="laser-beam" />
        </div>
      </div>
      {STEPS.map((s, i) => (
        <div className={`progress-step ${i === step ? 'current' : ''} ${i < step ? 'done' : ''}`} key={s.id}>
          <div className="progress-dot">
            {i < step ? <Check size={13}/> : <span>{s.kicker}</span>}
          </div>
          <span className="progress-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function Header({ eyebrow, title, subtitle }) {
  return (
    <div className="section-head">
      <div className="eyebrow">
        <Zap size={11} className="eyebrow-bolt" />
        <span>{eyebrow || 'STUDENT REGISTRATION FORM'}</span>
        <i/>
      </div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function Field({ label, value, onChange, error, type = 'text', placeholder, required = true, help, icon: Icon }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field-label">
        <span>{label}</span>
        {required && <b title="Required field">*</b>}
      </span>
      <div className="input-wrap">
        <input
          type={type}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        />
        {Icon ? <Icon size={16} className="input-icon"/> : type === 'email' && <Mail size={16} className="input-icon"/>}
      </div>
      {help && <small>{help}</small>}
      {error && <em><ShieldAlert size={12}/> {error}</em>}
    </label>
  );
}

function Select({ label, value, onChange, error, children, required = true }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field-label">
        <span>{label}</span>
        {required && <b title="Required field">*</b>}
      </span>
      <div className="input-wrap select-wrap">
        <select value={value ?? ''} onChange={e => onChange(e.target.value)}>
          <option value="">Select {label.toLowerCase()}</option>
          {children}
        </select>
        <ChevronDown size={16} className="select-chevron"/>
      </div>
      {error && <em><ShieldAlert size={12}/> {error}</em>}
    </label>
  );
}

function Personal({ data, update, errors }) {
  const photo = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert('Please choose an image smaller than 5 MB.'); return; }
    update('photo', URL.createObjectURL(f));
  };

  return (
    <div>
      <Header
        eyebrow="01 / PERSONAL PROFILE"
        title="Personal Information"
        subtitle="Let's get to know you better. Use your official details exactly as they appear on your records."
      />

      <div className="form-grid personal-grid">
        <div className="photo-column">
          <label className="photo-box">
            {data.photo ? (
              <img src={data.photo} alt="Student preview" />
            ) : (
              <div className="photo-placeholder">
                <div className="avatar-ring">
                  <Fingerprint size={38} className="biometric-icon"/>
                  <span className="ring-pulse" />
                </div>
                <strong>Upload Photo</strong>
                <span>Passport-style portrait</span>
              </div>
            )}
            <div className="corner-bracket cb-tl" />
            <div className="corner-bracket cb-tr" />
            <div className="corner-bracket cb-bl" />
            <div className="corner-bracket cb-br" />
            <span className="camera" title="Upload Image"><UserCheck size={16}/></span>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={photo}/>
          </label>
          <div className="photo-meta">
            <span>JPG • PNG • WEBP</span>
            <span>MAX 5 MB</span>
          </div>
        </div>

        <div className="fields-grid">
          <Field
            label="Full Name"
            value={data.fullName}
            onChange={v => update('fullName', v)}
            error={errors.fullName}
            placeholder="As per official records"
            icon={UserRound}
          />
          <Field
            label="Date of Birth"
            type="date"
            value={data.dob}
            onChange={v => update('dob', v)}
            error={errors.dob}
          />
          <Select label="Gender" value={data.gender} onChange={v => update('gender', v)} error={errors.gender}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
          <Select label="Blood Group" value={data.bloodGroup} onChange={v => update('bloodGroup', v)} error={errors.bloodGroup}>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </Select>
          <div className="full">
            <Field
              label="Aadhaar / ID Number"
              value={data.idNumber}
              onChange={v => update('idNumber', v.replace(/\D/g, ''))}
              error={errors.idNumber}
              placeholder="Numeric identification number"
              help="For college demonstration, use sample data rather than a real ID."
              icon={Hash}
            />
          </div>
          <Select label="Nationality" value={data.nationality} onChange={v => update('nationality', v)}>
            <option>Indian</option>
            <option>Other</option>
          </Select>
          <Select label="Category" value={data.category} onChange={v => update('category', v)} error={errors.category}>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
            <option>EWS</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

function Contact({ data, update, errors }) {
  return (
    <div>
      <Header
        eyebrow="02 / CONTACT TELEMETRY"
        title="Contact Information"
        subtitle="Keep your communication details current so the institution can reach you when it matters."
      />

      <div className="contact-highlight">
        <div className="highlight-icon"><Radio size={19}/></div>
        <div>
          <strong>Direct Communication Telemetry</strong>
          <span>Ensure your mobile number and email address are active and accessible.</span>
        </div>
        <Smartphone size={20} className="highlight-end"/>
      </div>

      <div className="form-grid two">
        <Field
          label="Email Address"
          type="email"
          value={data.email}
          onChange={v => update('email', v)}
          error={errors.email}
          placeholder="example@gmail.com"
          icon={Mail}
        />
        <Field
          label="Mobile Number"
          value={data.mobile}
          onChange={v => update('mobile', v.replace(/\D/g, '').slice(0, 10))}
          error={errors.mobile}
          placeholder="10-digit mobile number"
          icon={Smartphone}
        />
        <Field
          label="Alternate Phone"
          required={false}
          value={data.alternatePhone}
          onChange={v => update('alternatePhone', v.replace(/\D/g, '').slice(0, 10))}
          placeholder="Optional alternate number"
          icon={Phone}
        />
        <div className="full">
          <Field
            label="Address"
            value={data.address}
            onChange={v => update('address', v)}
            error={errors.address}
            placeholder="House / street / locality / landmark"
            icon={MapPin}
          />
        </div>
        <Field label="City" value={data.city} onChange={v => update('city', v)} error={errors.city}/>
        <Select label="State" value={data.state} onChange={v => update('state', v)} error={errors.state}>
          {STATES.map(s => <option key={s}>{s}</option>)}
        </Select>
        <Field
          label="PIN Code"
          value={data.pin}
          onChange={v => update('pin', v.replace(/\D/g, '').slice(0, 6))}
          error={errors.pin}
          placeholder="6-digit PIN"
          icon={Hash}
        />
      </div>
    </div>
  );
}

function Academic({ data, update, errors }) {
  return (
    <div>
      <Header
        eyebrow="03 / ACADEMIC RECORD"
        title="Academic Information"
        subtitle="Enter your educational background carefully. These details are used for admission records."
      />

      <div className="academic-banner">
        <div className="banner-art"><Award size={30}/><span className="banner-pulse"/></div>
        <div>
          <strong>Verified Academic Profile</strong>
          <p>Use marks exactly as shown on your original certificates and grade sheets.</p>
        </div>
        <div className="banner-badge"><BadgeCheck size={12}/> <span>VERIFIED FORMAT</span></div>
      </div>

      <h3 className="subhead"><span>10th / SSC</span><i/></h3>
      <div className="form-grid three">
        <Field label="School Name" value={data.school10} onChange={v => update('school10', v)} error={errors.school10}/>
        <Field label="Percentage / CGPA" value={data.percent10} onChange={v => update('percent10', v)} error={errors.percent10} placeholder="e.g. 9.2 / 92%"/>
        <Select label="Passing Year" value={data.year10} onChange={v => update('year10', v)} error={errors.year10}>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </Select>
      </div>

      <h3 className="subhead"><span>12th / Intermediate</span><i/></h3>
      <div className="form-grid three">
        <Field label="College Name" value={data.college12} onChange={v => update('college12', v)} error={errors.college12}/>
        <Field label="Percentage / CGPA" value={data.percent12} onChange={v => update('percent12', v)} error={errors.percent12} placeholder="e.g. 9.0 / 90%"/>
        <Select label="Passing Year" value={data.year12} onChange={v => update('year12', v)} error={errors.year12}>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </Select>
      </div>

      <div className="form-grid">
        <Field
          label="Entrance Exam Details"
          required={false}
          value={data.entrance}
          onChange={v => update('entrance', v)}
          placeholder="e.g. JEE, EAMCET, NEET, or None"
          icon={Sparkles}
        />
      </div>
    </div>
  );
}

function Course({ data, update, errors }) {
  return (
    <div>
      <Header
        eyebrow="04 / DEGREE & DISCIPLINE"
        title="Course & College Details"
        subtitle="Choose the academic path that matches your goals and admission route."
      />

      <div className="course-hero">
        <div className="course-art"><Layers size={28}/></div>
        <div>
          <strong>Specialized Future Pathway</strong>
          <span>Course preferences can be calibrated prior to final submission.</span>
        </div>
        <div className="mini-stat"><b>2026–27</b><span>ADMISSIONS</span></div>
      </div>

      <div className="form-grid two">
        <Field
          label="Application Number"
          value={data.application}
          onChange={v => update('application', v)}
          error={errors.application}
          placeholder="Enter application number"
          icon={Hash}
        />
        <Select label="Course / Branch" value={data.course} onChange={v => update('course', v)} error={errors.course}>
          <option>B.Tech — Computer Science</option>
          <option>B.Tech — Information Technology</option>
          <option>B.Tech — Electronics & Communication</option>
          <option>B.Tech — Mechanical Engineering</option>
          <option>B.Sc — Computer Science</option>
          <option>BBA</option>
        </Select>
        <Select label="Academic Year" value={data.academicYear} onChange={v => update('academicYear', v)} error={errors.academicYear}>
          <option>2026–27</option>
          <option>2027–28</option>
        </Select>
        <Select label="Admission Type" value={data.admissionType} onChange={v => update('admissionType', v)} error={errors.admissionType}>
          <option>Merit</option>
          <option>Entrance Exam</option>
          <option>Management</option>
          <option>Other</option>
        </Select>
        <div className="full">
          <Select label="Preferred Specialization" value={data.specialization} onChange={v => update('specialization', v)} error={errors.specialization}>
            <option>Artificial Intelligence & Machine Learning</option>
            <option>Data Science</option>
            <option>Cyber Security</option>
            <option>Cloud Computing</option>
            <option>Not Applicable</option>
          </Select>
        </div>
      </div>
    </div>
  );
}

function Parent({ data, update, errors }) {
  return (
    <div>
      <Header
        eyebrow="05 / GUARDIAN NETWORK"
        title="Parent / Guardian Details"
        subtitle="Provide a reliable family contact for important institutional communication."
      />

      <div className="family-strip">
        <div className="family-avatars">
          <span><UserRound size={17}/></span>
          <span><HeartHandshake size={16}/></span>
        </div>
        <div>
          <strong>Trusted Family Network</strong>
          <span>These details are used strictly for authorized academic and emergency communication.</span>
        </div>
        <Users size={20} className="highlight-end"/>
      </div>

      <div className="form-grid two">
        <Field label="Father's Name" value={data.father} onChange={v => update('father', v)} error={errors.father} icon={UserRound}/>
        <Field label="Mother's Name" value={data.mother} onChange={v => update('mother', v)} error={errors.mother} icon={UserRound}/>
        <Field
          label="Guardian Name"
          required={false}
          value={data.guardian}
          onChange={v => update('guardian', v)}
          placeholder="Optional if parents are primary contacts"
        />
        <Field label="Parent Occupation" value={data.occupation} onChange={v => update('occupation', v)} error={errors.occupation}/>
        <Field
          label="Parent Mobile"
          value={data.parentMobile}
          onChange={v => update('parentMobile', v.replace(/\D/g, '').slice(0, 10))}
          error={errors.parentMobile}
          placeholder="10-digit mobile number"
          icon={Smartphone}
        />
        <Select label="Annual Family Income" value={data.income} onChange={v => update('income', v)} error={errors.income}>
          <option>Below ₹2 Lakhs</option>
          <option>₹2–5 Lakhs</option>
          <option>₹5–10 Lakhs</option>
          <option>₹10–20 Lakhs</option>
          <option>Above ₹20 Lakhs</option>
        </Select>
      </div>
    </div>
  );
}

function Terms({ data, update, errors }) {
  return (
    <div>
      <Header
        eyebrow="06 / VERIFIED PROTOCOL"
        title="Terms & Conditions"
        subtitle="You're almost there. Please read the institutional terms and policies applied before submission."
      />

      <div className="terms-layout">
        <div className="terms-box">
          <div className="terms-title">
            <FileCheck2 size={20} className="terms-icon"/>
            <strong>Student Registration Terms & Policies Applied</strong>
          </div>
          <ol>
            <li>I declare that all personal and academic details provided are true, complete, and correct.</li>
            <li>I understand that incorrect or misleading information may forfeit admission registration.</li>
            <li>I agree to comply with all university bylaws, code of conduct, and anti-ragging policies.</li>
            <li>Terms and Conditions applied. Submission is subject to physical verification of original certificates.</li>
          </ol>
          <div className="terms-note">
            <ShieldCheck size={15}/>
            <span>Policies and conditions applied. Please use presentation/sample data for classroom viva testing.</span>
          </div>
        </div>

        <label className={`terms-check ${data.terms ? 'checked' : ''} ${errors.terms ? 'has-error' : ''}`}>
          <input type="checkbox" checked={data.terms} onChange={e => update('terms', e.target.checked)}/>
          <span className="custom-check">
            {data.terms && <Check size={14}/>}
          </span>
          <span>I have read, understood and agree to the Terms, Conditions & Institutional Policies Applied <b>*</b></span>
        </label>
        {errors.terms && <em className="terms-error"><ShieldAlert size={12}/> {errors.terms}</em>}
      </div>
    </div>
  );
}

/* ==========================================================================
   Success Screen — VIP Holographic Pass
   ========================================================================== */
function Success({ dark, id, name, data, reset, goToPortal }) {
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="success-screen">
      <div className="success-card">
        <div className="hologram-band" />
        <div className="success-spark one"><Sparkles size={24}/></div>
        <div className="success-spark two"><Zap size={22}/></div>

        <div className="success-ring"><CheckCircle2 size={46}/></div>

        <div className="eyebrow">
          <BadgeCheck size={13} />
          <span>REGISTRATION STATUS: REGISTRATION SUCCESSFUL</span>
          <i/>
        </div>

        <h1>Welcome to EduVerse{name ? `, ${name.split(' ')[0]}` : ''}!</h1>
        <p>Your student admission registration has been successfully logged. Keep your official registration pass below for institutional reference.</p>

        <div className="pass-card">
          <div className="pass-top">
            <div className="pass-chip">
              <span className="chip-line" />
              <span className="chip-line" />
            </div>
            <div className="pass-tag">OFFICIAL ADMISSION PASS</div>
          </div>

          <div className="pass-details">
            <div className="pass-item">
              <span>STUDENT NAME</span>
              <strong>{name || 'Registered Candidate'}</strong>
            </div>
            <div className="pass-item">
              <span>PROGRAM</span>
              <strong>{data.course ? data.course.split('—')[0] : 'Undergraduate'}</strong>
            </div>
            <div className="pass-item">
              <span>BATCH</span>
              <strong>{data.academicYear || '2026–27'}</strong>
            </div>
          </div>

          <div className="registration-id">
            <div className="id-left">
              <span>OFFICIAL REGISTRATION ID</span>
              <strong>{id}</strong>
            </div>
            <button className="copy-btn" onClick={copyId} title="Copy Registration ID">
              {copied ? <BadgeCheck size={16} className="copied-icon"/> : <Copy size={16}/>}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="pass-barcode"><div className="barcode-lines" /></div>
        </div>

        <div className="success-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="primary" onClick={goToPortal}>
            <BadgeCheck size={16}/>
            <span>Go to Student Portal & View Status</span>
          </button>
          <button className="secondary" onClick={reset}>
            <span>Register Another Student</span>
            <ArrowRight size={16}/>
          </button>
        </div>

        <div className="success-secure">
          <ShieldCheck size={14}/>
          <span>Registration Status: Registration Successful • Terms & Conditions Applied</span>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
