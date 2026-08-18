import React, { useState, useEffect, useCallback } from 'react';
import {
  Server, Monitor, Download, ChevronRight,
  Shield, Zap, Cpu, Eye, ArrowLeft, ChevronLeft,
  Gamepad2, Info, Copy, Check, Users, Sparkles, Sun, Moon,
  HardDrive, Wifi, Clock, Menu, X, RefreshCw,
  Wrench, Plane, Skull, ShieldAlert, Terminal, AlertTriangle, Box, Settings, TrendingUp
} from 'lucide-react';
import potatoImg from './assets/potato.png';
import rendimientoImg from './assets/rendimiento.png';
import intermediaImg from './assets/intermedia.png';
import calidadImg from './assets/calidad.png';
import calBslImg from './assets/calidad-bsl.png';
import calPhotonImg from './assets/calidad-photon.png';
import calSolasImg from './assets/calidad-solas.png';
import intermediaSildursImg from './assets/intermedia-sildurs.png';
import rendSildursImg from './assets/rendimiento-sildurs.png';
import './index.css';

// --- COMPONENTS ---

const FADE_DURATION = 600; // ms

const VideoCarousel = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const activeRef = React.useRef(null);

  React.useEffect(() => {
    const vid = activeRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.load();
    vid.play().catch(() => { });
  }, [activeIndex]);

  const changeVideo = (newIndex) => {
    if (transitioning) return;
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    setTransitioning(true);
    setTimeout(() => {
      setPrevIndex(null);
      setTransitioning(false);
    }, FADE_DURATION);
  };

  const nextVideo = () => changeVideo((activeIndex + 1) % videos.length);
  const prevVideo = () => changeVideo((activeIndex - 1 + videos.length) % videos.length);

  if (!videos || videos.length === 0) return null;

  return (
    <div className="video-carousel-container group">
      <div className="video-wrapper">

        {prevIndex !== null && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="carousel-video carousel-video-out"
            style={{ pointerEvents: 'none', animationDuration: `${FADE_DURATION}ms` }}
          >
            <source src={`${import.meta.env.BASE_URL}${videos[prevIndex].url}`} type="video/mp4" />
          </video>
        )}

        <video
          key={activeIndex}
          ref={activeRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`carousel-video ${transitioning ? 'carousel-video-in' : ''}`}
          style={{ pointerEvents: 'none', animationDuration: `${FADE_DURATION}ms` }}
          onCanPlay={() => activeRef.current?.play()}
        >
          <source src={`${import.meta.env.BASE_URL}${videos[activeIndex].url}`} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        {videos.length > 1 && (
          <>
            <div className="nav-overlay left" onClick={prevVideo}>
              <div className="nav-btn-hint">
                <ChevronLeft size={32} />
              </div>
            </div>
            <div className="nav-overlay right" onClick={nextVideo}>
              <div className="nav-btn-hint">
                <ChevronRight size={32} />
              </div>
            </div>
          </>
        )}

        <div className="video-info-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="shader-badge" key={activeIndex}>
            <Sparkles size={14} className="text-emerald-400" />
            <span>{videos[activeIndex].label}</span>
          </div>
        </div>

        {videos.length > 1 && (
          <div className="carousel-indicators">
            {videos.map((_, idx) => (
              <div
                key={idx}
                className={`indicator-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeVideo(idx);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



const ImageCarousel = ({ imagenes }) => {
  const [activo, setActivo] = useState(0);
  if (!imagenes || imagenes.length === 0) return null;
  const cambiar = (i) => setActivo((i + imagenes.length) % imagenes.length);

  return (
    <div className="video-carousel-container group">
      <div className="video-wrapper">
        <img
          key={activo}
          src={imagenes[activo].src}
          alt={imagenes[activo].label}
          className="carousel-video carousel-video-in"
        />

        {imagenes.length > 1 && (
          <>
            <div className="nav-overlay left" onClick={() => cambiar(activo - 1)}>
              <div className="nav-btn-hint"><ChevronLeft size={24} /></div>
            </div>
            <div className="nav-overlay right" onClick={() => cambiar(activo + 1)}>
              <div className="nav-btn-hint"><ChevronRight size={24} /></div>
            </div>
          </>
        )}

        <div className="video-info-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="shader-badge" key={activo}>
            <Sparkles size={14} className="text-emerald-400" />
            <span>{imagenes[activo].label}</span>
          </div>
          <span className="text-xs text-slate-300 font-bold">{imagenes[activo].fps}</span>
        </div>
      </div>

      {imagenes.length > 1 && (
        <div className="carousel-indicators">
          {imagenes.map((_, i) => (
            <div key={i} className={`indicator-dot ${i === activo ? 'active' : ''}`} onClick={() => cambiar(i)} />
          ))}
        </div>
      )}
    </div>
  );
};

const TabNav = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = ['home', 'servidor', 'modpacks', 'acerca'];

  const handleTab = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <nav className="nav-bar glass !rounded-full animate-enter">
      <div className="flex items-center gap-3">
        <div className="nav-logo-icon">
          <Gamepad2 size={24} />
        </div>
        <span className="text-xl font-bold text-gradient">Server Agosto 2026</span>
      </div>

      {/* Desktop links */}
      <div className="nav-links items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTab(tab)}
          >
            {tab === 'acerca' ? 'El Mundo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn ml-4"
          title="Cambiar tema"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Mobile right side */}
      <div className="nav-mobile-right">
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title="Cambiar tema"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`mobile-menu-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTab(tab)}
            >
              {tab === 'acerca' ? 'El Mundo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const HomeTab = ({ setActiveTab }) => (
  <div className="flex-col items-center text-center animate-enter delay-100 -mt-20">
    <div className="badge mb-8 border-emerald-500/50 bg-emerald-500/10 text-emerald-400 px-8 py-3 text-base font-bold">
      <Wrench size={20} /> <span>JAVA 1.21.11 — FABRIC</span>
    </div>
    <h1 className="text-gradient text-4xl mb-4">Server Agosto 2026</h1>
    <p className="text-secondary mb-8 max-w-2xl text-xl mx-auto leading-relaxed">
      Survival bonito y bien medido. Terreno de Terralith hasta donde alcanza la vista con Distant Horizons, shaders configurados uno a uno y cuatro variantes para que elijas cuántos FPS quieres.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 border-none px-8 py-6 text-lg shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.5)]" onClick={() => setActiveTab('modpacks')}>
        <Download size={22} /> Obtener Modpacks
      </button>
      <button className="btn btn-outline px-8 py-6 text-lg" onClick={() => setActiveTab('servidor')}>
        <Server size={22} /> Información del server
      </button>
    </div>

    {/* Lo del mando va aparte y destacado: es de lo que mas convence y antes estaba
        enterrado en un bloque de la pestaña del mundo. */}
    <div className="home-mando mt-10">
      <div className="home-mando-icono"><Gamepad2 size={26} /></div>
      <div className="text-left">
        <div className="text-base font-black text-white">El mejor servidor de Minecraft para jugar con mando</div>
        <div className="text-sm text-secondary leading-snug">
          Controlify va integrado y configurado: conecta un mando de Xbox, PlayStation o Switch
          y lo coge solo, con vibración e interfaz adaptada. Sin tocar nada.
        </div>
      </div>
    </div>
  </div>
);

const ServerTab = () => {
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const ip = "141.253.109.219:25565";

  const fetchStats = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      // Intento 1: Proxy avanzado (con CPU/RAM)
      const response = await fetch('https://mc-status-proxy.igl2005.workers.dev/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error("Worker no responde");
      const data = await response.json();
      setServerStats(data);
      setIsBlocked(false);
    } catch (error) {
      console.warn("Conexión avanzada bloqueada o caída, usando respaldo...");
      setIsBlocked(true);

      // Intento 2: API pública (Backup)
      try {
        const fbResponse = await fetch('https://api.mcsrvstat.us/3/141.253.109.219');
        const fbData = await fbResponse.json();

        if (fbData.online) {
          setServerStats({
            estado_maquina: 'running',
            jugadores_conectados: fbData.players?.online || 0,
            jugadores_maximos: fbData.players?.max || 20,
            tiempo_encendido: 'Disponible',
            cpu_uso: "0%",
            ram_mb: "0",
            disco_mb: "0",
            red_bajada_kb: "0",
            red_subida_kb: "0",
            isFallback: true
          });
        } else {
          setServerStats({ estado_maquina: 'offline' });
        }
      } catch (fbError) {
        setServerStats({ estado_maquina: 'offline' });
      }
    } finally {
      setLoading(false);
      setCountdown(20);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStats();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchStats]);

  const handleManualRefresh = () => {
    if (!loading) {
      setCountdown(20);
      setLoading(true);
      fetchStats();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-enter delay-100 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-gradient text-3xl">Información de nuestro servidor:</h2>
        <p className="text-secondary text-lg">Survival con Terralith, Distant Horizons y todo medido.</p>

        {/* IP Box */}
        <div className="ip-box" onClick={handleCopy} title="Haz clic para copiar">
          {ip}
          {copied ? <Check size={24} color="#4ade80" /> : <Copy size={24} />}
        </div>
        {copied && <p className="text-green-400 mt-2 text-sm font-medium">¡IP Copiada al portapapeles!</p>}

        {/* Live Server Status Widget */}
        <div className={`server-widget mt-6 ${serverStats?.estado_maquina === 'running' ? 'online' :
          serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
          }`}>

          <div className="server-widget-header">
            <div className="flex items-center gap-4">
              <div className="status-indicator">
                {serverStats?.estado_maquina === 'running' && <span className="status-ping"></span>}
                <span className={`status-dot ${serverStats?.estado_maquina === 'running' ? 'online' :
                  serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
                  }`}></span>
              </div>
              <h3 className={`status-title ${serverStats?.estado_maquina === 'running' ? 'online' :
                serverStats?.estado_maquina === 'starting' ? 'starting' : 'offline'
                }`}>
                {loading && !serverStats ? 'Conectando...' :
                  serverStats?.estado_maquina === 'running' ? 'Servidor Online' :
                    serverStats?.estado_maquina === 'starting' ? 'Servidor Iniciando...' : 'Servidor Offline'}
              </h3>

              {serverStats && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={handleManualRefresh}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
                    className="text-secondary hover:text-white transition-colors cursor-pointer"
                    title="Actualizar estado"
                  >
                    <RefreshCw size={18} className={loading ? "animate-spin text-white" : ""} />
                  </button>
                  <span className="text-sm text-secondary font-mono">{countdown}s</span>
                </div>
              )}
            </div>

            {!loading && serverStats?.estado_maquina === 'running' && (
              <div className="uptime-badge">
                <Clock size={16} className="text-emerald-400" />
                <span>Tiempo activo: <span className="text-white font-medium">{serverStats.tiempo_encendido}</span></span>
              </div>
            )}
          </div>

          {!loading && serverStats?.estado_maquina === 'running' && (
            <>
              {isBlocked && (
                <div className="mx-6 mt-4 mb-6 p-4 glass flex items-start gap-3 border-amber-500/30 animate-enter" style={{ background: 'rgba(245, 158, 11, 0.05)' }}>
                  <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200/80 leading-relaxed">
                    <strong className="text-amber-400 block mb-0.5">Estadísticas limitadas</strong>
                    La conexión con el monitor de hardware parece estar bloqueada. Si usas un bloqueador de anuncios (uBlock/AdBlock) o VPN, prueba a desactivarlo para ver los datos de CPU/RAM.
                  </div>
                </div>
              )}
              <div className="server-widget-grid">

                <div className="stat-card">
                  <div className="stat-label">
                    <Users size={18} /> Jugadores
                  </div>
                  <div className="stat-value">
                    {serverStats.jugadores_conectados} <span className="stat-unit">/ {serverStats.jugadores_maximos}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <Cpu size={18} /> CPU
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : `${(parseFloat(serverStats.cpu_uso) / 4).toFixed(1)}%`} <span className="stat-unit">/ 100%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <Server size={18} /> RAM
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : (parseFloat(serverStats.ram_mb) / 1024).toFixed(1)} <span className="stat-unit">/ 24 GB</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">
                    <HardDrive size={18} /> Disco
                  </div>
                  <div className="stat-value">
                    {serverStats.isFallback ? 'N/A' : (parseFloat(serverStats.disco_mb) / 1024).toFixed(1)} <span className="stat-unit">GB</span>
                  </div>
                </div>

                <div className="stat-card wide">
                  <div className="stat-label">
                    <Wifi size={18} /> Red
                  </div>
                  <div className="w-full mx-auto mt-3 px-1" style={{ maxWidth: '180px' }}>
                    <div className="flex justify-between items-center gap-2 mb-2">
                      <span className="stat-unit" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Bajada:</span>
                      <span className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{serverStats.isFallback ? 'N/A' : parseFloat(serverStats.red_bajada_kb).toFixed(0)} <span className="stat-unit" style={{ fontSize: '0.7rem', fontWeight: 400 }}>{serverStats.isFallback ? '' : 'KB/s'}</span></span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="stat-unit" style={{ fontSize: '0.75rem', opacity: 0.8 }}>Subida:</span>
                      <span className="text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{serverStats.isFallback ? 'N/A' : parseFloat(serverStats.red_subida_kb).toFixed(0)} <span className="stat-unit" style={{ fontSize: '0.7rem', fontWeight: 400 }}>{serverStats.isFallback ? '' : 'KB/s'}</span></span>
                    </div>
                  </div>
                </div>

              </div>

              {serverStats.nombres_jugadores && serverStats.nombres_jugadores.length > 0 && (
                <div className="player-row">
                  <span className="player-row-label"><Users size={14} /> En línea ahora:</span>
                  {serverStats.nombres_jugadores.map((nombre, i) => (
                    <span key={i} className="player-tag">{nombre}</span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="glass-card mt-8 mb-8 flex flex-row flex-wrap gap-8 justify-around p-6">
        <div className="flex items-center gap-4 text-left">
          <Cpu className="text-emerald-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Procesador</h4>
            <p className="text-secondary font-medium">4 OCPU</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-left">
          <Server className="text-emerald-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Memoria RAM</h4>
            <p className="text-secondary font-medium">24 GB</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-left">
          <Zap className="text-emerald-400" size={36} />
          <div>
            <h4 className="text-xl mb-1 text-white">Red</h4>
            <p className="text-secondary font-medium">4 Gbps de Ancho</p>
          </div>
        </div>
      </div>

      <div className="glass-card border-emerald-500/20">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="text-emerald-500" size={32} />
          <h3 className="directives-title mb-0">Directrices de Supervivencia</h3>
        </div>

        <div className="rule-item pl-8 py-5 relative overflow-hidden">
          <div className="absolute top-4 left-3.5 w-1.5 h-[calc(100%-32px)] bg-emerald-500 rounded-full"></div>
          <div className="flex items-start gap-4">
            <Skull className="text-emerald-500 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Libertad y Consecuencias</h4>
              <p className="text-secondary leading-relaxed">
                Este es un mundo de supervivencia pura. Tienes libertad total: juega en cooperativo, mantén la paz o ve por tu cuenta.
                <span className="text-white font-bold block mt-2">
                  Si decides ser hostil, robar o sabotear a otros, asume que la comunidad puede (y probablemente lo hará) cazarte y destruir todo lo que has construido.
                </span>
                No hay protecciones mágicas ni zonas seguras artificiales. Apechugas con tus actos.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-item pl-8 py-5 relative overflow-hidden mt-4">
          <div className="absolute top-4 left-3.5 w-1.5 h-[calc(100%-32px)] bg-purple-500 rounded-full"></div>
          <div className="flex items-start gap-4">
            <Cpu className="text-purple-400 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Eficiencia de Máquinas</h4>
              <p className="text-secondary">
                La ingeniería requiere optimización. No satures el servidor con mecanismos infinitos e innecesarios si no estás presente. Si tu fábrica causa lag crítico, será desmantelada sin previo aviso.
              </p>
            </div>
          </div>
        </div>

        <div className="rule-item pl-8 py-5 relative overflow-hidden mt-4">
          <div className="absolute top-4 left-3.5 w-1.5 h-[calc(100%-32px)] bg-yellow-500 rounded-full"></div>
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-500 mt-1" size={24} />
            <div>
              <h4 className="mb-2 text-xl text-white uppercase tracking-wider">Límites de Exploración</h4>
              <p className="text-secondary">
                Como recomendación para mantener la estabilidad, evita alejarte más de 15,000 bloques del centro. Generar terreno a distancias extremas puede ralentizar el servidor y arruinar la experiencia de juego de todos. ¡Hay mucho espacio disponible cerca!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformanceChart = ({ selectedPackId }) => {
  const [resolution, setResolution] = useState('1080p');
  // Medidas reales: escena fija, 1080p pantalla completa, mundo con Terralith y LODs
  // ya generados, mediodía. Portátil de pruebas (RTX 3050 Laptop) EN MODO JUEGO: en modo
  // ahorro la GPU se queda en 795 MHz de 2100 y estas cifras bajan bastante.
  // Cada cifra es la media de dos pasadas con la máquina a 46 grados: cuatro minutos de
  // enfriado antes de cada una, porque midiendo en caliente el mismo pack pierde un 10%
  // y eso ya nos coló un resultado falso una vez.
  const perfData = {
    '1080p': [
      { packId: 'potato', name: 'Potato (sin shader)', fps: 285 },
      { packId: 'rendimiento', name: 'Rendimiento (E-LITE)', fps: 157 },
      { packId: 'rendimiento', name: "Rendimiento (Sildur's Fast)", fps: 161 },
      { packId: 'intermedia', name: 'Intermedia (E-LITE + DH)', fps: 98 },
      { packId: 'intermedia', name: "Intermedia (Sildur's Fast + DH)", fps: 95 },
      { packId: 'calidad', name: 'Calidad (Photon)', fps: 63 },
      { packId: 'calidad', name: 'Calidad (Solas)', fps: 58 },
      { packId: 'calidad', name: 'Calidad (BSL)', fps: 57 }
    ]
  };

  const currentData = perfData[resolution];
  const maxFps = Math.max(...currentData.map(d => d.fps === 'N/A' ? 0 : d.fps));

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center mb-2 gap-4 text-center">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2 text-white"><Zap size={20} className="text-emerald-400" /> Comparativa de Rendimiento</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <select
            value={resolution}
            onChange={e => setResolution(e.target.value)}
            className="theme-select border rounded-full px-5 py-2.5 outline-none focus:border-emerald-500 font-medium text-sm cursor-pointer transition-all hover:bg-slate-800/80 shadow-md"
          >
            <option value="1080p">1080p</option>
          </select>
        </div>
      </div>

      <div className="p-10 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-xl">
        <div className="space-y-6">
          {currentData.map((item, index) => {
            const isSelected = item.packId === selectedPackId;
            const width = item.fps === 'N/A' ? '0%' : `${(item.fps / maxFps) * 100}%`;

            return (
              <div key={index} className="group">
                <div className="flex justify-between text-[11px] mb-2 px-1">
                  <span className={`${isSelected ? 'text-green-400 font-black' : 'text-emerald-300/60 font-bold'} group-hover:text-white transition-colors uppercase tracking-wider`}>
                    {item.name} {isSelected && '— ACTUAL'}
                  </span>
                  <span className={`font-black ${isSelected ? 'text-green-400' : 'text-emerald-200'}`}>{item.fps} {item.fps !== 'N/A' && 'FPS'}</span>
                </div>
                <div className="w-full bg-slate-800/40 rounded-full border border-white/5 overflow-hidden" style={{ height: '8px' }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: width,
                      backgroundColor: isSelected ? '#22c55e' : '#14b8a6',
                      opacity: isSelected ? 1 : 0.4,
                      boxShadow: isSelected ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-secondary mt-6 leading-relaxed">
          Los cuatro puntos que separan a E-LITE de Sildur's en rendimiento no son una ventaja
          real: alternando pasada a pasada, una la gana cada uno (172 y 153 E-LITE contra 164 y
          169 Sildur's). Entre esos dos elige por cómo se ven, que en FPS están empatados.
        </p>
      </div>
    </div>
  );
};

// Bloque de hardware de cada variante.
//
// Lo unico MEDIDO aqui es la columna de la RTX 3050 Laptop a 1080p que ya sale arriba. Las
// equivalencias de GPU son una estimacion escalando desde ella, y asi se dicen: "para ~60
// FPS hace falta como una X". No se pone un numero de FPS por tarjeta porque seria inventado.
//
// La parte de CPU si es medida y es la que no cuenta ninguna web: el 18/08/2026 se comprobo
// que estando quieto el cuello NO es la GPU ni Distant Horizons, es Sodium construyendo la
// malla a ~40 secciones/s. Los chunks del render distance ya estan a los 5-6 s; quitar DH
// entero no adelanta la carga ni un segundo (21 s con y sin el) aunque los FPS pasen de 46 a
// 86. Y Sodium reparte sus hilos de construccion solo, sin opcion que tocar:
//     clamp(max(nucleos/3, nucleos-6), 1, 10)
// Por eso un PC de 8 hilos se queda con 2 constructores contra los 10 de uno de 16, y el
// terreno tarda ~5 veces mas en entrar aunque los FPS sean buenos. Las secciones crecen con
// el CUADRADO del render distance, asi que bajarlo es la unica palanca real (11 -> 8 deja el
// 53% del terreno; 11 -> 6, el 30%).
//
// Caso real confirmado: un i5 9600K son 6 nucleos SIN hyperthreading, o sea 6 hilos ->
// max(2, 0) = 2 constructores. Con una 1660 Super da los mismos FPS que la 3050 Laptop de
// las pruebas y aun asi el terreno no termina de entrar. Es exactamente lo que predice la
// formula, y por eso la tabla va por HILOS y no por nucleos.
const HILOS_SODIUM = [
  { hilos: '4 hilos', ejemplo: '2 núcleos con HT', constructores: 1 },
  { hilos: '6 hilos', ejemplo: '6 núcleos sin HT, tipo i5 9600K', constructores: 2 },
  { hilos: '8 hilos', ejemplo: '4 núcleos con HT', constructores: 2 },
  { hilos: '12 hilos', ejemplo: '6 núcleos con HT', constructores: 6 },
  { hilos: '16 hilos', ejemplo: '8 núcleos con HT', constructores: 10 }
];

// Plegable reutilizable: el mismo chisme que ya tenia el bloque de hardware, sacado aparte
// porque ahora hay varios.
// `grande` es para los apartados de optimizacion, donde la cabecera es el titulo del
// apartado y no una nota al pie como en el bloque de hardware.
const Desplegable = ({ titulo, icono, grande, children }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <div>
      <button
        onClick={() => setAbierto(!abierto)}
        className={grande
          ? 'flex items-center gap-2.5 w-full text-left opt-cabecera-btn'
          : 'flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors text-left'}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <ChevronRight
          size={grande ? 18 : 14}
          className={`shrink-0 ${grande ? 'text-emerald-400' : ''}`}
          style={{ transform: abierto ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}
        />
        {icono}
        {titulo}
      </button>
      {abierto && <div className={`${grande ? 'mt-7' : 'mt-6'} space-y-4 animate-enter`}>{children}</div>}
    </div>
  );
};

// Tabla de datos medidos, con el mismo aire que la de los hilos de Sodium.
const TablaMedida = ({ cabeceras, filas }) => (
  <div className="overflow-x-auto">
    <table className="text-sm w-full max-w-xl" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr className="text-[11px] uppercase tracking-wider text-slate-500 font-black">
          {cabeceras.map((c, i) => (
            <th key={c} className={`pb-2 ${i === 0 ? 'text-left pr-6' : 'text-left pr-6'}`}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody style={{ fontVariantNumeric: 'tabular-nums' }}>
        {filas.map((f) => (
          <tr key={f[0]} className="border-t border-white/5">
            {f.map((celda, i) => (
              <td key={i} className={`py-2 pr-6 ${i === 0 ? 'text-secondary' : 'text-slate-200 font-bold'}`}>{celda}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HardwareCard = ({ hw }) => {
  const [abierto, setAbierto] = useState(false);
  if (!hw) return null;

  return (
    <div className="glass-card !p-8 md:!p-10 border-white/5 bg-slate-900/40 relative overflow-hidden mb-12">
      <div className="absolute top-4 left-3 w-1.5 h-[calc(100%-32px)] bg-emerald-500/40 rounded-full"></div>
      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center gap-2">
        <Monitor className="text-emerald-400" size={18} /> Hardware recomendado
      </h4>

      <div className="grid md:grid-cols-3 gap-6">
        {/* GRAFICA: aqui el foco son los MODELOS, que es lo que la gente busca. Los 60 FPS
            son solo la condicion, van de eyebrow pequeño. */}
        <div className="hw-box">
          <span className="hw-titulo"><Monitor size={13} /> Gráfica</span>
          <span className="hw-eyebrow">Para 60 FPS a 1080p</span>
          <div className="hw-chips">
            {hw.gpus.map((g) => <span key={g} className="hw-chip hw-chip-lg">{g}</span>)}
            <span className="hw-chip hw-chip-mas">y superiores</span>
          </div>
          <div className="hw-vram">
            <span className="hw-vram-eti">VRAM</span>
            <span><b>{hw.vramMin}</b> mínimo</span>
            <span className="hw-vram-sep">·</span>
            <span><b>{hw.vramRec}</b> recomendado</span>
          </div>
        </div>

        {/* PROCESADOR: al reves que la grafica, aqui el foco SI son los nucleos, porque es
            lo que decide cuando aparece el terreno. Los modelos van debajo de apoyo. */}
        <div className="hw-box">
          <span className="hw-titulo"><Cpu size={13} /> Procesador</span>
          <div className="hw-cifra">{hw.cpuNucleos}</div>
          <div className="hw-sub">{hw.cpuHilos}</div>
          <div className="hw-chips">
            {hw.cpus.map((c) => <span key={c} className="hw-chip">{c}</span>)}
            <span className="hw-chip hw-chip-mas">y superiores</span>
          </div>
          <div className="hw-aviso">
            <AlertTriangle size={13} className="shrink-0 mt-0.5" />
            <span>{hw.cpuAviso}</span>
          </div>
        </div>

        {/* RAM: en columna y con la etiqueta encima del numero. El recomendado resaltado,
            que es el que hay que mirar. */}
        <div className="hw-box">
          <span className="hw-titulo"><HardDrive size={13} /> RAM al juego</span>
          <span className="hw-eyebrow">En el launcher, no la del PC</span>
          <div className="hw-ram-fila">
            <div className="hw-ram-item">
              <div className="hw-ram-eti">mínimo</div>
              <div className="hw-cifra hw-cifra-sm">6 GB</div>
            </div>
            <div className="hw-ram-item hw-ram-rec">
              <div className="hw-ram-eti">recomendado</div>
              <div className="hw-cifra hw-cifra-sm">8 GB</div>
            </div>
            <div className="hw-ram-item">
              <div className="hw-ram-eti">ideal</div>
              <div className="hw-cifra hw-cifra-sm">10 GB</div>
            </div>
          </div>
        </div>
      </div>

      {/* El detalle de por que la CPU manda en la carga del terreno. Plegado porque es largo
          y no todo el mundo lo necesita, pero es lo unico que explica "me va a 100 FPS y el
          terreno no acaba de aparecer". */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <ChevronRight size={14} style={{ transform: abierto ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }} />
          Por qué el procesador decide cuándo aparece el terreno
        </button>

        {abierto && (
          <div className="mt-5 space-y-4 animate-enter">
            <p className="text-sm text-secondary leading-relaxed">
              Si el terreno tarda en salir, casi nunca es la gráfica ni Distant Horizons.
              Está medido: parado, los chunks del render distance entero ya están cargados
              a los <span className="theme-text-primary font-bold">5-6 segundos</span>, pero
              Sodium sigue construyendo la malla a unas 40 secciones por segundo hasta el
              segundo 22. Quitando Distant Horizons <span className="theme-text-primary font-bold">entero</span> la
              carga no se adelantó ni un segundo (21 s con él y sin él), aunque los FPS
              pasaran de 46 a 86. O sea: no falta terreno, falta quién lo malle.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Y eso lo hace la CPU. Sodium reparte sus hilos de construcción solo, sin ninguna
              opción que puedas tocar, con <code className="text-emerald-300">máx(núcleos/3, núcleos−6)</code>,
              tope 10:
            </p>

            <div className="overflow-x-auto">
              <table className="text-sm w-full max-w-md" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500 font-black">
                    <th className="text-left pb-2 pr-6">Tu procesador</th>
                    <th className="text-left pb-2">Hilos construyendo</th>
                  </tr>
                </thead>
                <tbody style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {HILOS_SODIUM.map((f) => (
                    <tr key={f.hilos} className="border-t border-white/5">
                      <td className="py-2 pr-6 text-secondary">
                        <span className="text-slate-200 font-bold">{f.hilos}</span>
                        <span className="block text-[11px] text-slate-500">{f.ejemplo}</span>
                      </td>
                      <td className="py-2 text-slate-200 font-bold align-top">{f.constructores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-secondary leading-relaxed">
              De 10 a 2 hay cinco veces menos trabajo por segundo, y por eso en un PC justo el
              terreno no termina de entrar aunque los FPS vayan bien. No lo arregla ningún mod.
              Lo único que funciona es <span className="theme-text-primary font-bold">bajar la distancia de renderizado</span>,
              porque el terreno a construir crece con el cuadrado: de 11 a 8 chunks queda el
              53% del trabajo, y de 11 a 6, el 30%. Eso último es cuenta, no medida: lo medido
              es el ritmo al que Sodium construye, que no cambia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ModpacksTab = ({ setActiveTab }) => {
  const packs = {
    potato: {
      id: 'potato',
      title: 'Potato — máximos FPS',
      icon: <Zap size={40} className="text-emerald-400" />,
      desc: 'Sin shader, sin Distant Horizons y sin los resource packs caros. Distancia de visión 8; el resto del mundo, igual que en las demás.',
      features: [
        '68 mods: todos menos Distant Horizons',
        'Sin shader activado (los 5 vienen igual en el zip)',
        'Render distance 8, simulación 16',
        '7 de los 13 resource packs activos',
        'Gráficos rápidos y escala de entidades 0,75'
      ],
      noLleva: [
        'Distant Horizons: el mod ni siquiera va en el zip, así que no hay horizonte lejano',
        'Shader activado: sin sombras, sin reflejos en el agua y sin niebla de shader',
        'Fresh Animations y los otros 5 packs de animaciones y color (los llevan calidad e intermedia)',
        'Gráficos fancy: nubes, hojas y transparencias van en modo rápido'
      ],
      igualQue: 'Todo lo demás es idéntico a las otras variantes: mismos mods de juego, mismo mundo y mismos ajustes de servidor.',
      performance: {
        fps: 'mín. 203', media: '285',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop',
        usage: 'GPU 84% · CPU 24% · RAM 6,5 GB · VRAM 460 MB',
        dh: 'No incluido',
        resolution: '1080p'
      },
      hardware: {
        gpus: ['GTX 1050', 'RX 560', 'Intel UHD 630', 'Vega 8', 'Iris Xe'],
        vramMin: '2 GB',
        vramRec: '4 GB',
        vramMedida: '0,5 GB',
        cpus: ['i3-8100', 'Ryzen 3 2200G', 'i5-7400'],
        cpuNucleos: '2 núcleos',
        cpuHilos: '4 hilos',
        cpuAviso: 'Con menos, poco más se puede quitar: ya va sin shader ni horizonte lejano.'
      },
      screenshot: potatoImg,
      capturas: [ { src: potatoImg, label: 'Sin shader', fps: '285 FPS' } ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/potato.zip'
    },
    rendimiento: {
      id: 'rendimiento',
      title: 'Rendimiento — fluidez con shaders',
      icon: <Cpu size={40} className="text-emerald-400" />,
      desc: 'Shader ligero E-LITE, sin Distant Horizons y con los resource packs más caros desactivados. Si quieres horizonte lejano, ve a intermedia.',
      features: [
        '68 mods: todos menos Distant Horizons',
        'Shader E-LITE activado, con niebla',
        'Render distance 8, simulación 16',
        '7 de los 13 resource packs activos',
        "Sildur's Enhanced Default Fast listo como alternativa: mismos FPS que E-LITE y algo más estable",
        'Gráficos fancy: nubes, hojas y transparencias completas'
      ],
      noLleva: [
        'Distant Horizons: el mod no va en el zip. Probado en frío: con DH corta y la render distance bajada tampoco compensa',
        'Fresh Animations y los otros 5 packs de animaciones y color (los llevan calidad e intermedia)',
        'Los shaders pesados activados: Photon, BSL y Solas vienen dentro, pero el que arranca es E-LITE'
      ],
      igualQue: 'Frente a potato: aquí sí hay shader y gráficos completos. Frente a intermedia: los mismos mods menos DH y seis packs menos.',
      performance: {
        fps: 'mín. 129', media: '157',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop',
        usage: 'GPU 95% · CPU 33% · RAM 7,3 GB · VRAM 868 MB',
        dh: 'No incluido',
        resolution: '1080p'
      },
      hardware: {
        gpus: ['GTX 1050 Ti', 'GTX 1650', 'RX 570', 'RX 580', 'Arc A380'],
        vramMin: '2 GB',
        vramRec: '4 GB',
        vramMedida: '0,9 GB',
        cpus: ['i3-12100', 'Ryzen 3 3300X', 'i5-8400', 'Ryzen 5 2600'],
        cpuNucleos: '4 núcleos',
        cpuHilos: '8 hilos',
        cpuAviso: 'Aquí manda la gráfica: con distancia de renderizado 8 el terreno se renderiza rápido aunque la CPU sea justa.'
      },
      screenshot: rendimientoImg,
      capturas: [
        { src: rendimientoImg, label: 'E-LITE (por defecto)', fps: '157 FPS' },
        { src: rendSildursImg, label: "Sildur's Enhanced Default Fast", fps: '161 FPS' }
      ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/rendimiento.zip'
    },
    intermedia: {
      id: 'intermedia',
      title: 'Intermedia — el equilibrio',
      icon: <Eye size={40} className="text-emerald-400" />,
      desc: 'Distant Horizons con shader ligero y los 13 resource packs activos. El horizonte va afinado para que cueste lo mínimo y se vea igual de lejos.',
      features: [
        'Los 69 mods, Distant Horizons incluido',
        'Distant Horizons a radio 128 con la configuración barata',
        'Shader E-LITE con niebla y nubes',
        'Render distance 10, simulación 16',
        'Los 13 resource packs activos, animaciones incluidas',
        "Sildur's Enhanced Default Fast parcheado para iluminar los LODs: 95 FPS, alternativa a E-LITE"
      ],
      noLleva: [
        'Los shaders pesados activados: Photon, BSL y Solas vienen dentro, pero el que arranca es E-LITE',
        'El horizonte de calidad: radio 128 en vez de 300 (la calidad de los LODs es la misma que en calidad)',
        'Render distance 11 de Minecraft: aquí va a 10'
      ],
      igualQue: 'Frente a rendimiento: aquí sí hay horizonte lejano y están los 13 resource packs.',
      performance: {
        fps: 'mín. 84', media: '98',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop',
        usage: 'GPU 92% · CPU 37% · RAM 7,8 GB · VRAM 1,2 GB',
        dh: 'Activado (radio 128, calidad de LODs media)',
        resolution: '1080p'
      },
      hardware: {
        gpus: ['GTX 1650 Super', 'GTX 1060 6 GB', 'RX 580 8 GB', 'RX 5500 XT'],
        vramMin: '2 GB',
        vramRec: '4 GB',
        vramMedida: '1,2 GB',
        cpus: ['Ryzen 5 3600', 'Ryzen 5 5600', 'i5-10400', 'i5-11400'],
        cpuNucleos: '6 núcleos',
        cpuHilos: '12 hilos',
        cpuAviso: 'Con menos hilos el terreno tarda más en renderizarse. Bajar la distancia de renderizado de 10 a 8 ayuda: se renderiza en torno a un 35% más rápido.'
      },
      screenshot: intermediaImg,
      capturas: [
        { src: intermediaImg, label: 'E-LITE (por defecto)', fps: '98 FPS' },
        { src: intermediaSildursImg, label: "Sildur's Enhanced Default Fast", fps: '95 FPS' }
      ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/intermedia.zip'
    },
    calidad: {
      id: 'calidad',
      title: 'Calidad — lo más bonito',
      icon: <Sparkles size={40} className="text-emerald-400" />,
      desc: 'Tres shaders pesados configurados: Photon por defecto, con BSL y Solas listos para cambiar. Distant Horizons a 300 bloques.',
      features: [
        'Los 69 mods, Distant Horizons incluido',
        'Photon activado; BSL y Solas listos para cambiar',
        'Distant Horizons a radio 300 con la configuración barata',
        'Render distance 11, simulación 16',
        'Los 13 resource packs activos, animaciones incluidas'
      ],
      noLleva: [],
      igualQue: 'Es la variante completa: no se le ha quitado nada. Todo lo que las otras tres desactivan (Distant Horizons, los seis packs de animaciones y color, los shaders pesados) aquí está encendido.',
      performance: {
        fps: 'Photon 63 · BSL 57 · Solas 58', media: '63',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop',
        usage: 'GPU 79% · CPU 41% · RAM 7,4 GB · VRAM 1,1 GB',
        dh: 'Activado (radio 300)',
        resolution: '1080p'
      },
      hardware: {
        gpus: ['RTX 3050', 'GTX 1660 Super', 'RTX 2060', 'RX 5600 XT', 'Arc A750'],
        vramMin: '2 GB',
        vramRec: '4 GB',
        vramMedida: '1,1 GB',
        cpus: ['Ryzen 7 5700X', 'i7-11700', 'i5-12600K', 'Ryzen 7 3700X'],
        cpuNucleos: '8 núcleos',
        cpuHilos: '16 hilos',
        cpuAviso: 'Con menos hilos el terreno tarda más en renderizarse. Bajar la distancia de renderizado de 11 a 8 ayuda: se renderiza en torno a un 45% más rápido.'
      },
      screenshot: calidadImg,
      capturas: [
        { src: calPhotonImg, label: 'Photon (por defecto)', fps: '63 FPS' },
        { src: calBslImg, label: 'BSL', fps: '57 FPS' },
        { src: calSolasImg, label: 'Solas', fps: '58 FPS' }
      ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/calidad.zip'
    }
  };

  const [view, setView] = useState('client'); // client, detail
  const [selectedPack, setSelectedPack] = useState(null);

  const openDetail = (packId) => {
    setSelectedPack(packs[packId]);
    setView('detail');
  };


  const renderClientPacks = () => (
    <div className="animate-enter max-w-5xl mx-auto">


      <div className="text-center mb-16">
        <h2 className="text-gradient">Selecciona tu Modpack</h2>
        <p className="text-secondary text-lg">Elige la versión que mejor se adapte a tu PC.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {['calidad', 'intermedia', 'rendimiento', 'potato'].map(key => (
          <div key={key} className="glass-card cursor-pointer items-center text-center" onClick={() => openDetail(key)}>
            <div className="mb-6 circular-icon-container">{packs[key].icon}</div>
            <h3 className="text-xl mb-3">{packs[key].title}</h3>
            <p className="text-secondary text-sm mb-6 flex-1">{packs[key].desc}</p>
            <button className="btn btn-outline w-full justify-between">
              Seleccionar <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedPack) return null;
    return (
      <div className="animate-enter max-w-5xl mx-auto glass-card relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>

        <button
          className="btn btn-outline mb-8 w-max"
          onClick={() => setView('client')}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="circular-icon-container">
            {selectedPack.icon}
          </div>
          <div>
            <h2 className="mb-2 text-3xl">{selectedPack.title}</h2>
            <div className="badge">1.21.11 / Fabric</div>
          </div>
        </div>

        <p className="text-lg text-secondary mb-8">{selectedPack.desc}</p>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-stretch w-full">
          {/* Content Card */}
          <div className="flex-1 glass-card !p-8 md:!p-10 border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-3 w-1.5 h-[calc(100%-32px)] bg-emerald-500/40 rounded-full"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Box className="text-emerald-400" size={18} /> Contenido
            </h4>
            <ul className="space-y-4 flex-1">
              {selectedPack.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 mt-2 shrink-0"></div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Lo que esta variante no lleva y las demás sí. Sin esto la lista de arriba no
                dice nada: todas parecen iguales hasta que ves qué le falta a cada una. */}
            {selectedPack.noLleva && selectedPack.noLleva.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  No lleva (y otras variantes sí)
                </h5>
                <ul className="space-y-3">
                  {selectedPack.noLleva.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                      <X size={14} className="text-rose-400/70 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedPack.igualQue && (
              <p className="mt-6 text-[12px] leading-relaxed text-slate-500">
                {selectedPack.igualQue}
              </p>
            )}
          </div>

          {/* Performance Card */}
          <div className="flex-1 glass-card !p-8 md:!p-10 border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-3 w-1.5 h-[calc(100%-32px)] bg-emerald-500/40 rounded-full"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Cpu className="text-emerald-400" size={18} /> Rendimiento
            </h4>

            <div className="space-y-6">
              <div className="grid grid-cols-1">
                {/* RTX 3050 */}
                <div className="space-y-4">
                  <div className="text-[13px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Zap size={20} /> RTX 3050 | 1080p | Arch Linux
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-label">Promedio:</span>
                      <div className="text-5xl font-black text-white leading-none pt-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {selectedPack.performance.media} <span className="text-[12px] text-slate-500 uppercase">fps</span>
                      </div>
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-label">Rango:</span>
                      <div className="text-xs font-bold text-slate-300">{selectedPack.performance.fps}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 pt-6 border-t border-white/5">
                {/* El uso del sistema venia en una linea sola y se leia fatal. Partido en
                    chips por el separador que ya traia el dato. */}
                <div className="flex flex-col gap-2 col-span-2">
                  <span className="text-label">Uso Sistema:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPack.performance.usage.split('·').map((u) => (
                      <span key={u} className="perf-chip">{u.trim()}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">DH Mod:</span>
                  <span className="text-value">{selectedPack.performance.dh}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Resolución:</span>
                  <span className="text-value">1080p (Native)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HardwareCard hw={selectedPack.hardware} />

        <div className="w-full mb-12">
          {selectedPack.capturas && selectedPack.capturas.length > 0 ? (
            <ImageCarousel imagenes={selectedPack.capturas} />
          ) : selectedPack.videos && selectedPack.videos.length > 0 ? (
            <VideoCarousel videos={selectedPack.videos} />
          ) : selectedPack.screenshot && (
            <div className="space-y-4">
              <div className="screenshot-frame glass !p-1 overflow-hidden border border-white/5 shadow-2xl group relative rounded-2xl bg-slate-900/40">
                <img
                  src={selectedPack.screenshot}
                  alt="Benchmark Screenshot"
                  className="w-full rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="screenshot-overlay absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="text-xl font-black text-white">{selectedPack.performance.gpu} — {selectedPack.title}</div>
                </div>
              </div>
            </div>
          )}
          <PerformanceChart selectedPackId={selectedPack.id} />
        </div>

        <div className="mt-12 space-y-4">
          <a
            href={selectedPack.downloadUrl}
            download={`${selectedPack.id}_pack.zip`}
            className="btn btn-primary w-full py-6 text-xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)]"
          >
            <Download size={28} /> Descargar Modpack .zip
          </a>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => {
                setActiveTab('acerca');
                // La pestaña se monta en el mismo frame, asi que hay que esperar uno para
                // que exista el ancla; si no, scrollIntoView no encuentra nada.
                setTimeout(() => {
                  const el = document.getElementById('instalacion');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 60);
              }}
              className="btn btn-outline py-4 font-bold uppercase tracking-wider border-white/10 text-slate-300 hover:text-white"
            >
              <Info size={18} /> Cómo se instala
            </button>
          </div>

          <div className="mt-12 p-10 bg-emerald-500/[0.03] rounded-2xl border border-emerald-500/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h4 className="text-xs font-black text-emerald-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
              <Settings size={14} /> Personalización de Interfaz y Cliente
            </h4>
            <div className="space-y-6">
              <p className="text-xs text-secondary leading-relaxed font-medium">
                Estos mods son <span className="text-slate-200">100% opcionales</span> y pueden configurarse o desactivarse según tus preferencias personales:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                <ul className="text-xs text-secondary leading-relaxed font-medium space-y-4">
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Xaero's Minimap</span>
                    <span className="leading-snug opacity-80">Minimapa circular ya configurado, y mapa completo con 'M'.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Shoulder Surfing</span>
                    <span className="leading-snug opacity-80">Cámara en tercera persona sobre el hombro.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Physics Mod</span>
                    <span className="leading-snug opacity-80">Escombros y banderas con física. El más pesado del pack.</span>
                  </li>
                </ul>
                <ul className="text-xs text-secondary leading-relaxed font-medium space-y-4">
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Auto HUD</span>
                    <span className="leading-snug opacity-80">Esconde la interfaz cuando no hace falta.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Subtle Effects</span>
                    <span className="leading-snug opacity-80">Partículas de ambiente. Las de correr vienen desactivadas.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="text-emerald-300 font-black uppercase tracking-wider">Controlify</span>
                    <span className="leading-snug opacity-80">Soporte de mando, por si juegas con él.</span>
                  </li>
                </ul>
              </div>            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {view === 'client' && renderClientPacks()}
      {view === 'detail' && renderDetail()}
    </div>
  );
};

const AboutTab = () => (
  <div className="animate-enter delay-100 max-w-5xl mx-auto px-6 pb-32 flex flex-col gap-8">
    <section className="text-center pt-4">
      <div className="bg-emerald-600/10 rounded-full mb-4 w-max mx-auto border border-emerald-500/20 flex items-center justify-center shadow-lg" style={{ width: '76px', height: '76px' }}>
        <Sparkles size={36} className="text-emerald-400" />
      </div>
      <h2 className="text-gradient mb-3 text-5xl">Cómo está hecho esto</h2>
      <p className="text-secondary text-xl max-w-3xl mx-auto leading-relaxed">
        Un survival bonito, con <span className="theme-text-primary font-bold">Terralith</span> generando el terreno
        y <span className="theme-text-primary font-bold">Distant Horizons</span> dibujándolo hasta el horizonte.
        Calidad e intermedia llevan los 69 mods; rendimiento y potato son las mismas menos Distant Horizons,
        que a esas distancias cuesta más de lo que da. Todo lo demás es configuración.
      </p>
    </section>

    <section className="glass-card">
      <h3 className="text-2xl mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <Box className="text-emerald-400" /> Qué lleva el pack
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Zap size={18} /> Rendimiento</h4>
            <p className="text-sm text-secondary">Sodium, Lithium, FerriteCore, EntityCulling, Cull Leaves, Particle Core, ImmediatelyFast, ScalableLux, BadOptimizations.</p>
          </div>
          <div className="pt-4">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Eye size={18} /> Mundo y terreno</h4>
            <p className="text-sm text-secondary">Terralith, Structory, Towns &amp; Towers, Explorify y Distant Horizons.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Sparkles size={18} /> Ambiente</h4>
            <p className="text-sm text-secondary">Atmosfera, Particle Rain, Immersive Storms, Subtle Effects, Wakes, Visuality, Cosy Critters y 13 resource packs.</p>
          </div>
          <div className="pt-4">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Monitor size={18} /> Shaders</h4>
            <p className="text-sm text-secondary">Iris con los cinco shaders instalados en las cuatro variantes: Photon, BSL, Solas, E-LITE y Sildur's Enhanced Default Fast, cada uno con su configuración ya ajustada. Sildur's va parcheado para que ilumine los LODs de Distant Horizons (el original los dejaba en negro y el horizonte lejano se veía como una mancha), así que ya sirve en las cuatro variantes. Corre igual que E-LITE —161 contra 157 en rendimiento y 95 contra 98 en intermedia, diferencias que se dan la vuelta de una pasada a otra—, pero es más estable: menos tirones en el 5% de fotogramas peores. Cambia entre uno y otro en Iris según cuál te guste más, que en FPS te da igual.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="glass-card">
      <h3 className="text-2xl mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <AlertTriangle className="text-emerald-400" /> Antes de quejarte de los FPS
      </h3>
      <p className="text-secondary leading-relaxed mb-4">
        Todas las cifras están medidas en una GPU de portatil (RTX 3050 Laptop). En un ordenador de sobremesa o con GPU superior, obtendrás bastante más rendimiento.
      </p>
      <p className="text-secondary leading-relaxed">
        Y si cambias entre pantalla completa y ventana con shaders activos, Distant Horizons se corrompe:
        pulsa <span className="theme-text-primary font-bold">R</span> para que Iris recargue el pipeline y vuelve a la normalidad.
      </p>
    </section>

    {/* Optimizacion. Cada apartado es una tarjeta suya con aire alrededor: la version de
        antes iba todo pegado y no se distinguia donde acababa una cosa y empezaba otra.
        Los porcentajes salen de pares medidos seguidos y alternados (results.jsonl), no de
        comparar tandas distintas: entre tanda y tanda la maquina varia un 20% larga. */}
    <section className="glass-card">
      <h3 className="text-2xl mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
        <Zap className="text-emerald-400" /> Optimización
      </h3>

      <div className="flex flex-col gap-6">

        <div className="opt-apartado">
          <Desplegable grande icono={<TrendingUp size={18} className="text-emerald-400" />} titulo="Qué es lo que más FPS da">
            <p className="text-sm text-secondary leading-relaxed">
              Por orden de lo que más se nota. El porcentaje es lo que subieron los FPS al
              quitarlo, midiendo el antes y el después seguidos y en el mismo sitio. Cuando hay
              un rango es porque se repitió en varias escenas y no dio lo mismo en todas.
            </p>

            <div className="opt-lista">
              {[
                {
                  n: 1, nombre: 'Quitar el shader', pct: '+32 a +47%',
                  detalle: 'Es con diferencia lo más caro de todo el pack. Medido tres veces: 137 → 181, 87 → 128 y 121 → 171 FPS. Si vas justo, esto antes que ninguna otra cosa.'
                },
                {
                  n: 2, nombre: 'Quitar Distant Horizons', pct: '+10 a +29%',
                  detalle: 'Con la configuración barata que llevan los packs. Medido: 120 → 151 y 134 → 174. Con el horizonte a radio 300 y un shader pesado encima la cosa se dispara: ahí fue 46 → 86 FPS.'
                },
                {
                  n: 3, nombre: 'Desactivar los 6 resource packs de animaciones y color', pct: '+7 a +20%',
                  detalle: 'Fresh Animations y compañía. Los mismos ajustes con 7 packs y con 13: 132 → 141 y 145 → 174 FPS. Es lo que hacen potato y rendimiento.'
                },
                {
                  n: 4, nombre: 'Bajar la distancia de renderizado', pct: '+12 a +14%',
                  detalle: 'De 8 a 6 chunks: 157 → 178 y 142 → 158 FPS. Además es lo único que hace que el terreno se renderice antes en un procesador justo, que es un problema distinto de los FPS.'
                },
                {
                  n: 5, nombre: 'Bajar la distancia de simulación', pct: '0%',
                  detalle: 'De 16 a 8 no dio nada: 36 → 34 y 51 → 45 FPS, o sea que salió incluso peor. Lo que hace esta opción no es dibujar, es simular mobs y bloques. No la toques.'
                }
              ].map((f) => (
                <div key={f.n} className="opt-fila">
                  <span className="opt-pos">{f.n}</span>
                  <div className="min-w-0">
                    <div className="opt-nombre">{f.nombre}</div>
                    <div className="opt-detalle">{f.detalle}</div>
                  </div>
                  <span className={`opt-pct ${f.pct === '0%' ? 'opt-pct-nulo' : ''}`}>{f.pct}</span>
                </div>
              ))}
            </div>
          </Desplegable>
        </div>

        <div className="opt-apartado">
          <Desplegable grande icono={<Cpu size={18} className="text-emerald-400" />} titulo="Los cuatro hilos de Distant Horizons salen gratis">
            <p className="text-sm text-secondary leading-relaxed">
              Distant Horizons trae una opción para decirle cuántos hilos de CPU puede usar, y
              lo que se lee por ahí es que la bajes a uno para que no te robe rendimiento. Se
              midió en intermedia: cuatro hilos a tope contra uno solo al 20% de su tiempo,
              todo lo demás idéntico.
            </p>

            <TablaMedida
              cabeceras={['Hilos de DH', 'Pasada A', 'Pasada B']}
              filas={[['4 hilos, sin frenar', '107 FPS', '95 FPS'], ['1 hilo al 20%', '94 FPS', '105 FPS']]}
            />

            <p className="text-sm text-secondary leading-relaxed">
              Empate, y encima cruzado: cada configuración gana una pasada. La diferencia entre
              las dos es más pequeña que lo que varía la propia máquina entre pasada y pasada.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              El truco está en que la medida se toma con el horizonte{' '}
              <span className="theme-text-primary font-bold">ya construido</span> (cuatro minutos
              de calentamiento antes de empezar a contar). Los hilos de DH trabajan generando
              LODs; una vez generados, no hay nada que repartir. Así que ponerle un hilo no te
              devuelve FPS, solo hace que el horizonte tarde muchísimo más en aparecer. Los packs
              van con los cuatro puestos: el horizonte se construye rápido y no cuesta nada.
            </p>
          </Desplegable>
        </div>

        <div className="opt-apartado">
          <Desplegable grande icono={<X size={18} className="text-rose-400" />} titulo="Lo que se probó y no funcionó">
            <div>
              <div className="opt-nombre mb-1">Meter Distant Horizons en rendimiento, aunque sea al mínimo</div>
              <p className="text-sm text-secondary leading-relaxed">
                La idea era tentadora: horizonte lejano también en la variante rápida, poniendo
                el radio de LODs bajísimo y bajando la distancia de renderizado de Minecraft a 6
                para compensar. No sale a cuenta.
              </p>
            </div>

            <TablaMedida
              cabeceras={['Configuración', 'Pasada A', 'Pasada B']}
              filas={[
                ['Sin DH, distancia 8 (lo que lleva el pack)', '141 FPS', '174 FPS'],
                ['DH radio 48, distancia 6', '133 FPS', '147 FPS'],
                ['DH radio 32, distancia 6', '136 FPS', '149 FPS']
              ]}
            />

            <p className="text-sm text-secondary leading-relaxed">
              Pierde en las dos pasadas, hasta un 15%, y encima ves menos: con la distancia de
              Minecraft a 6 y los LODs empezando a 32 bloques, el horizonte que ganas es una
              franja estrecha. Pagas FPS por casi nada. Por eso rendimiento no lleva el mod
              siquiera dentro del zip.
            </p>

            <div className="pt-2">
              <div className="opt-nombre mb-1">Quitar Distant Horizons para que el terreno cargue antes</div>
              <p className="text-sm text-secondary leading-relaxed">
                Parecía el sospechoso, porque genera su horizonte con cuatro hilos. Se quitó
                entero: el terreno tardó <span className="theme-text-primary font-bold">22
                segundos con él y 21 sin él</span>, mientras los FPS pasaban de 46 a 86. Da
                imagen por fotograma, no retrasa la carga. Sube los FPS, pero para eso ya está
                la lista de arriba.
              </p>
            </div>
          </Desplegable>
        </div>

        <div className="opt-apartado">
          <Desplegable grande icono={<Info size={18} className="text-emerald-400" />} titulo="Cómo están medidas todas estas cifras">
            <p className="text-sm text-secondary leading-relaxed">
              El juego se lanza solo desde un script, siempre en el mismo mundo, en las mismas
              coordenadas y con el mismo ángulo de cámara, con 6 GB de RAM. Antes de cada
              pasada se espera a que la máquina esté fría, porque una pasada caliente rinde
              menos y eso solo ya mueve el resultado.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Cada configuración se mide <span className="theme-text-primary font-bold">alternada</span> con
              su control (A, B, A, B) y nunca contra una tanda de otro día: de una tanda a otra
              la misma configuración puede dar 141 o 174 FPS. Por eso aquí todos los
              porcentajes salen de parejas medidas seguidas, y cuando dos pasadas no se ponen
              de acuerdo se pone el rango en vez de inventar una media bonita.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              Y lo que se guarda no son solo los FPS: también cuántos chunks y cuántas secciones
              de terreno hay dibujadas en cada segundo. Eso es lo que permite ver cosas que los
              FPS esconden, como que ir en élitro sube los FPS porque el mundo deja de dibujarse.
            </p>
          </Desplegable>
        </div>

      </div>
    </section>

    <section className="glass-card" id="instalacion" style={{ scrollMarginTop: '7rem' }}>
      <h3 className="text-2xl mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <Info className="text-emerald-400" /> Cómo se instala
      </h3>
      <p className="text-secondary leading-relaxed mb-6">
        Cada zip trae un instalador dentro. <span className="theme-text-primary font-bold">No hace falta
        borrar carpetas a mano</span> ni saber dónde está nada.
      </p>
      <ol className="text-secondary leading-relaxed list-decimal ml-6 space-y-3">
        <li>
          Instala <span className="theme-text-primary font-bold">Fabric Loader 0.19.3</span> para
          Minecraft <span className="theme-text-primary font-bold">1.21.11</span> desde{' '}
          <a href="https://fabricmc.net/use/installer/" target="_blank" rel="noreferrer"
             className="text-emerald-400 underline">fabricmc.net</a>. Esto solo se hace una vez, y sin
          ello el juego arranca sin mods.
        </li>
        <li>Descarga el zip de la variante que quieras y descomprímelo <span className="theme-text-primary font-bold">donde te apetezca</span> (el escritorio vale).</li>
        <li>
          Entra en la carpeta y ejecuta el instalador:
          <div className="mt-2 ml-1 space-y-1 text-sm">
            <div>· <span className="theme-text-primary font-bold">Windows</span>: clic derecho en <code>autoinstallmodsWindows.bat</code> → <span className="text-emerald-400 font-bold">Ejecutar como administrador</span>.</div>
            <div>· <span className="theme-text-primary font-bold">Linux</span>: doble clic en <code>autoinstallmodsLinux.sh</code>, o en una terminal <code>bash autoinstallmodsLinux.sh</code></div>
          </div>
        </li>
        <li>Se abre una ventana negra que te va contando lo que hace y se cierra sola. Ya está.</li>
        <li>En el launcher, dale al menos <span className="theme-text-primary font-bold">6 GB de RAM</span> al juego (8 si puedes) y elige el perfil de Fabric.</li>
      </ol>
    </section>

    {/* Esto estaba metido dentro de "Cómo se instala" y no pintaba nada ahí: son dudas
        sueltas, no pasos de la instalación. Fuera y con las cabeceras en forma de pregunta. */}
    <section className="glass-card">
      <h3 className="text-2xl mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <Info className="text-emerald-400" /> Preguntas y respuestas
      </h3>

      <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
        <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2"><Shield size={18} /> ¿Pierdo mis mods y mis ajustes?</h4>
        <p className="text-sm text-secondary leading-relaxed">
          El instalador <span className="theme-text-primary font-bold">mueve</span> tus carpetas
          <code> mods</code>, <code>shaderpacks</code>, <code>resourcepacks</code> y <code>config</code> a una
          carpeta <code>copia-anterior-&lt;fecha&gt;</code> junto al propio instalador. No borra nada: si tenías
          mods, siguen ahí. Para volver atrás, devuelves esas carpetas a su sitio.
        </p>
        <p className="text-sm text-secondary leading-relaxed mt-3">
          De tus ajustes solo cambia las líneas de vídeo de la variante (render distance y similares).
          Tu FOV, tus controles, el sonido y el idioma se quedan como los tengas.
        </p>
        <p className="text-sm text-secondary leading-relaxed mt-3">
          ¿Te arrepientes? En la misma carpeta tienes <code>restaurarmodsWindows.bat</code> y{' '}
          <code>restaurarmodsLinux.sh</code>: devuelven tus carpetas de antes tal y como estaban,
          y apartan las del modpack por si quieres volver a ponerlas.
        </p>
      </div>

      <div className="mt-6 p-6 rounded-2xl border border-white/10">
        <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-200"><Sparkles size={18} className="text-emerald-400" /> ¿Cómo exprimo la variante Calidad?</h4>
        <p className="text-sm text-secondary leading-relaxed">
          Para exprimir la variante <span className="theme-text-primary font-bold">Calidad</span> al máximo si tienes un PC potente,
          lo que más se nota y mejor imagen da es <span className="theme-text-primary font-bold">aumentar la distancia de renderizado de Distant Horizons</span> (en el menú del mod dentro del juego, icono de DH arriba a la izquierda). Con shaders pesados apenas cuesta FPS extra y extiende el horizonte enormemente.
        </p>
      </div>

      <div className="mt-6 p-6 rounded-2xl border border-white/10">
        <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-200"><Gamepad2 size={18} className="text-emerald-400" /> ¿Puedo jugar con mando?</h4>
        <p className="text-sm text-secondary leading-relaxed">
          El modpack incluye <span className="theme-text-primary font-bold">Controlify</span> integrado para jugar cómodamente con mando de Xbox, PlayStation o Switch.
        </p>
        <ul className="text-sm text-secondary leading-relaxed list-disc ml-5 mt-2 space-y-1">
          <li>Conecta tu mando antes o durante la partida; lo detectará automáticamente.</li>
          <li>Accede a los ajustes en <span className="theme-text-primary font-bold">Opciones → Controles → Controlify</span> para ajustar la sensibilidad o cambiar botones.</li>
          <li>Incluye vibración háptica e interfaz adaptada a mando.</li>
        </ul>
      </div>

      <div className="mt-6 p-6 rounded-2xl border border-white/10">
        <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-200"><AlertTriangle size={18} className="text-emerald-400" /> ¿Y si el terreno lejano se ve roto?</h4>
        <p className="text-sm text-secondary leading-relaxed">
          Pasa al cambiar entre pantalla completa y ventana con shaders activos: Distant Horizons y
          Iris se desincronizan. Pulsa <span className="theme-text-primary font-bold">R</span> y se arregla
          al instante. Recargar chunks con F3+A no sirve.
        </p>
      </div>
    </section>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
      <div className="container min-h-screen flex flex-col justify-between">
        <div className="flex-1 flex flex-col">

          <main className="flex-grow flex flex-col justify-center pb-12">
            {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
            {activeTab === 'servidor' && <ServerTab />}
            {activeTab === 'modpacks' && <ModpacksTab setActiveTab={setActiveTab} />}
            {activeTab === 'acerca' && <AboutTab />}
          </main>
        </div>

        <footer className="w-full text-center text-secondary text-sm py-8 border-t border-white/5 bg-slate-900/30 backdrop-blur-md mt-auto">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Server Agosto 2026</p>
            <div className="flex items-center gap-3">
              <span className="opacity-50 text-[10px] uppercase tracking-widest font-bold">Versión de Referencia:</span>
              <div className="px-5 py-2 bg-emerald-600/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-400">
                JAVA 1.21.11 | FABRIC
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
