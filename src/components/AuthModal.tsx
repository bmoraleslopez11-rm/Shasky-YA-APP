import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    profile,
    updateProfile,
    role,
    setRole,
    requestBiometricAuth,
    addNotification,
  } = useApp();

  const [mode, setMode] = useState<'view' | 'register'>('view');
  const [selectedRole, setSelectedRole] = useState<UserRole>(role);
  const [name, setName] = useState(profile.name);
  const [rut, setRut] = useState(profile.rut);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone.replace('+56 9 ', ''));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pwdStrength, setPwdStrength] = useState<'empty' | 'weak' | 'medium' | 'strong'>('empty');
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleRutFormat = (val: string) => {
    let clean = val.replace(/[^0-9kK]/g, '').toUpperCase();
    if (clean.length > 1) {
      const cuerpo = clean.slice(0, -1);
      const dv = clean.slice(-1);
      let formatted = '';
      for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
        formatted = cuerpo.charAt(i) + (j > 0 && j % 3 === 0 ? '.' : '') + formatted;
      }
      setRut(formatted + '-' + dv);
    } else {
      setRut(clean);
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (!val) {
      setPwdStrength('empty');
    } else if (val.length < 6) {
      setPwdStrength('weak');
    } else if (val.length < 9) {
      setPwdStrength('medium');
    } else {
      setPwdStrength('strong');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      rut,
      email,
      phone: `+56 9 ${phone}`,
      role: selectedRole,
    });
    setRole(selectedRole);

    addNotification({
      title: 'Perfil actualizado',
      body: 'Tus datos de contacto quedaron guardados.',
      icon: 'verified_user',
      type: 'security',
    });

    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md bg-[#faf8ff] dark:bg-[#070d18] border border-[#eaedff] dark:border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-2xl relative my-6">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white p-1 rounded-full z-10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {mode === 'view' ? (
          /* Profile View */
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full rounded-2xl object-cover ring-2 ring-[#006b5f]"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[14px] shadow-sm">
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#76f4e0]/20 text-[#006b5f] dark:text-[#59dbc7] text-[11px] font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>Cuenta verificada</span>
            </div>

            <h3 className="font-bold text-[20px] text-[#001026] dark:text-white">{profile.name}</h3>
            <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8]">
              RUT: <strong className="text-[#001026] dark:text-white font-mono">{profile.rut}</strong>
            </p>

            {/* Account Badge Strip */}
            <div className="w-full grid grid-cols-2 gap-2 my-4 text-left">
              <div className="p-2.5 rounded-xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b]">
                <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] font-bold uppercase block">
                  Datos de contacto
                </span>
                <span className="text-[12px] font-bold text-[#006b5f] dark:text-[#59dbc7] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">contact_mail</span>
                  Actualizados
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b]">
                <span className="text-[10px] text-[#44474e] dark:text-[#94a3b8] font-bold uppercase block">
                  Autenticación
                </span>
                <span className="text-[12px] font-bold text-[#001026] dark:text-white flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006b5f]">
                    fingerprint
                  </span>
                  Biometría activa
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={() => {
                  requestBiometricAuth(() => {
                    alert('¡Identidad confirmada mediante sensor biométrico FIDO2!');
                  });
                }}
                className="w-full h-11 rounded-xl bg-[#006b5f] hover:bg-[#005047] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                <span>Probar Acceso Biométrico Ahora</span>
              </button>

              <button
                onClick={() => setMode('register')}
                className="w-full h-11 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all hover:bg-opacity-80"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Editar Datos de Usuario / Rol</span>
              </button>
            </div>
          </div>
        ) : (
          /* "Crea tu cuenta / Editar Datos" Form View matching mockups */
          <div className="flex flex-col w-full">
            <div className="flex flex-col items-center text-center pb-4">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1V4FtgzP2r-fkBFDlDJNCvXdqu6cxqs3o9TnDJDs7OjdjyBJcCuYPhYWP2mVn1X5sjmmzckIk6_VLx9j6Q9ripmuZTtoJQ_MWMVch4lI7y8BME8ipooJTng9Y8LK4oKPcT6xEhvC4tWWkGQIw_OLNs3fQxsYcnUg3a_WBnSFDszBMkZwUZqB5XIh3e1I5usOe9GJPMLZY6iovbc6gRXxkb_y8nPRME8BN9b3dBA89zCSYuymGOoExyyKnU"
                alt="Emblema Shasky"
                className="w-12 h-12 object-contain drop-shadow mb-2"
              />
              <h2 className="font-bold text-[22px] text-[#001026] dark:text-white leading-tight">
                Crea tu cuenta
              </h2>
              <p className="text-[12px] text-[#44474e] dark:text-[#94a3b8] mt-0.5">
                Elige tu perfil para comenzar en Shasky Ya
              </p>
            </div>

            {/* Role Select Bento Cards */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="text-[10px] font-bold text-[#44474e] dark:text-[#94a3b8] uppercase tracking-wider">
                TIPO DE USUARIO
              </span>

              {/* Client Option */}
              <div
                onClick={() => setSelectedRole('cliente')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedRole === 'cliente'
                    ? 'border-[#006b5f] bg-[#ffffff] dark:bg-[#0b1320] shadow-md'
                    : 'border-[#eaedff] dark:border-[#1e293b] opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-[#93ccff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">home</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[14px] text-[#001026] dark:text-white">
                        Soy Cliente
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#eaedff] dark:bg-[#1e293b] text-[#44474e] dark:text-[#94a3b8]">
                        Hogar
                      </span>
                    </div>
                    <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] block">
                      Busco maestros calificados y servicios de confianza.
                    </span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    selectedRole === 'cliente' ? 'bg-[#006b5f]' : 'bg-[#eaedff] dark:bg-[#1e293b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>

              {/* Master Option */}
              <div
                onClick={() => setSelectedRole('maestro')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedRole === 'maestro'
                    ? 'border-[#006b5f] bg-[#ffffff] dark:bg-[#0b1320] shadow-md'
                    : 'border-[#eaedff] dark:border-[#1e293b] opacity-80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] text-[#001026] dark:text-[#93ccff] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">construction</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[14px] text-[#001026] dark:text-white">
                        Soy Maestro / Constructor
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-[#76f4e0]/30 text-[#006b5f] dark:text-[#59dbc7]">
                        Pro
                      </span>
                    </div>
                    <span className="text-[11px] text-[#44474e] dark:text-[#94a3b8] block">
                      Ofrezco mis servicios profesionales.
                    </span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                    selectedRole === 'maestro' ? 'bg-[#006b5f]' : 'bg-[#eaedff] dark:bg-[#1e293b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#001026] dark:text-white">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Camila Edwards González"
                  className="w-full h-11 px-3.5 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f]"
                />
              </div>

              {/* RUT */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-bold text-[#001026] dark:text-white">
                    RUT Chileno
                  </label>
                  <span className="text-[11px] text-[#006b5f] dark:text-[#59dbc7] font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px]">shield</span>
                    Validación Oficial
                  </span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={12}
                  value={rut}
                  onChange={(e) => handleRutFormat(e.target.value)}
                  placeholder="12.345.678-K"
                  className="w-full h-11 px-3.5 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f] font-mono"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#001026] dark:text-white">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.cl"
                  className="w-full h-11 px-3.5 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f]"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#001026] dark:text-white">
                  Teléfono Celular
                </label>
                <div className="flex items-center gap-2">
                  <div className="h-11 px-3 rounded-xl bg-[#eaedff] dark:bg-[#1e293b] flex items-center gap-1 text-[13px] font-bold text-[#001026] dark:text-white shrink-0 select-none">
                    <span>🇨🇱</span>
                    <span>+56 9</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={9}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="8412 9043"
                    className="flex-1 h-11 px-3.5 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#001026] dark:text-white">
                  Contraseña Cifrada
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full h-11 pl-3.5 pr-10 bg-[#ffffff] dark:bg-[#0b1320] border border-[#eaedff] dark:border-[#1e293b] rounded-xl text-[13px] text-[#001026] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#006b5f]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#44474e] dark:text-[#94a3b8] hover:text-[#001026] dark:hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {/* Strength bar */}
                <div className="flex gap-1 h-1 mt-1">
                  <div
                    className={`flex-1 rounded-full ${
                      pwdStrength === 'weak'
                        ? 'bg-red-500'
                        : pwdStrength === 'medium' || pwdStrength === 'strong'
                        ? 'bg-amber-400'
                        : 'bg-[#eaedff] dark:bg-[#1e293b]'
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      pwdStrength === 'medium' || pwdStrength === 'strong'
                        ? 'bg-amber-400'
                        : 'bg-[#eaedff] dark:bg-[#1e293b]'
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      pwdStrength === 'strong' ? 'bg-[#10B981]' : 'bg-[#eaedff] dark:bg-[#1e293b]'
                    }`}
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms-check"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="mt-0.5 accent-[#006b5f]"
                />
                <label
                  htmlFor="terms-check"
                  className="text-[11px] text-[#44474e] dark:text-[#94a3b8] cursor-pointer"
                >
                  Acepto los Términos de Servicio y la Política de Privacidad de Shasky Ya Chile.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#001026] dark:bg-[#006b5f] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all mt-2"
              >
                <span>Guardar cambios</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('view')}
                className="text-[12px] text-[#44474e] dark:text-[#94a3b8] hover:underline text-center mt-1"
              >
                Cancelar y volver
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
