import React, { useState, useEffect, useCallback } from 'react';
import {
  Server, Monitor, Download, ChevronRight,
  Shield, Zap, Cpu, Eye, ArrowLeft, ChevronLeft,
  Gamepad2, Info, Copy, Check, Users, Sparkles, Sun, Moon,
  HardDrive, Wifi, Clock, Menu, X, RefreshCw,
  Wrench, Plane, Skull, ShieldAlert, Terminal, AlertTriangle, Box, Settings
} from 'lucide-react';
import potatoImg from './assets/potato.png';
import rendimientoImg from './assets/rendimiento.png';
import intermediaImg from './assets/intermedia.png';
import calidadImg from './assets/calidad.png';
import calBslImg from './assets/calidad-bsl.png';
import calPhotonImg from './assets/calidad-photon.png';
import calSolasImg from './assets/calidad-solas.png';
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
  const [gpu, setGpu] = useState('RTX 3050 (ahorro)');
  const [resolution, setResolution] = useState('1080p');

  // Medidas reales: escena fija, 1080p pantalla completa, mundo con Terralith y LODs
  // ya generados, mediodía. La columna "modo ahorro" es como está el portátil ahora
  // (GPU a 795 MHz de 2100); "modo juego" es la estimación al quitarle el freno.
  const perfData = {
    '1080p': {
      'RTX 3050 (ahorro)': [
        { packId: 'potato', name: 'Potato (sin shader)', fps: 238 },
        { packId: 'rendimiento', name: 'Rendimiento (E-LITE)', fps: 118 },
        { packId: 'intermedia', name: 'Intermedia (E-LITE + DH)', fps: 89 },
        { packId: 'calidad', name: 'Calidad (Photon)', fps: 55 },
        { packId: 'calidad', name: 'Calidad (BSL)', fps: 57 },
        { packId: 'calidad', name: 'Calidad (Solas)', fps: 52 }
      ],
      'RTX 3050 (modo juego, est.)': [
        { packId: 'potato', name: 'Potato (sin shader)', fps: 300 },
        { packId: 'rendimiento', name: 'Rendimiento (E-LITE)', fps: 240 },
        { packId: 'intermedia', name: 'Intermedia (E-LITE + DH)', fps: 180 },
        { packId: 'calidad', name: 'Calidad (Photon)', fps: 150 },
        { packId: 'calidad', name: 'Calidad (Complementary)', fps: 110 },
        { packId: 'calidad', name: 'Calidad (Solas)', fps: 105 }
      ]
    }
  };

  const currentData = perfData[resolution][gpu];
  const maxFps = Math.max(...currentData.map(d => d.fps === 'N/A' ? 0 : d.fps));

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center justify-center mb-2 gap-4 text-center">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2 text-white"><Zap size={20} className="text-emerald-400" /> Comparativa de Rendimiento</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <select
            value={gpu}
            onChange={e => setGpu(e.target.value)}
            className="theme-select border rounded-full px-5 py-2.5 outline-none focus:border-emerald-500 font-medium text-sm cursor-pointer transition-all hover:bg-slate-800/80 shadow-md"
          >
            <option value="RTX 3050 (ahorro)">RTX 3050 · modo ahorro (medido)</option>
            <option value="RTX 3050 (modo juego, est.)">RTX 3050 · modo juego (estimado)</option>
          </select>
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
      desc: 'Sin shaders y con Distant Horizons al mínimo. Todo el pack instalado, pero configurado para exprimir cada fotograma. Para portátiles humildes o si prefieres fluidez por encima de todo.',
      features: ['Los 68 mods del pack', 'Sin shaders', 'Distant Horizons radio 32', 'Render distance 3', 'Configuración pre-optimizada'],
      performance: {
        fps: 'mín. 137', media: '238',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop en modo ahorro',
        usage: 'GPU 84% · CPU 24% · RAM 6,5 GB · VRAM 460 MB',
        dh: 'Activado (radio 32)',
        resolution: '1080p'
      },
      screenshot: potatoImg,
      capturas: [ { src: potatoImg, label: 'Sin shader', fps: '238 FPS' } ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/potato.zip'
    },
    rendimiento: {
      id: 'rendimiento',
      title: 'Rendimiento — fluidez con shaders',
      icon: <Cpu size={40} className="text-emerald-400" />,
      desc: 'Shader ligero y Distant Horizons corto pero con calidad vertical media, para que los árboles lejanos no se vean como columnas. Va muy suelto.',
      features: ['Los 68 mods del pack', 'Shader E-LITE', 'Distant Horizons radio 64', 'Render distance 10', 'Niebla del shader activada'],
      performance: {
        fps: 'mín. 92', media: '118',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop en modo ahorro',
        usage: 'GPU 95% · CPU 33% · RAM 7,3 GB · VRAM 868 MB',
        dh: 'Activado (radio 64)',
        resolution: '1080p'
      },
      screenshot: rendimientoImg,
      capturas: [ { src: rendimientoImg, label: 'E-LITE (config ligera)', fps: '118 FPS' } ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/rendimiento.zip'
    },
    intermedia: {
      id: 'intermedia',
      title: 'Intermedia — el equilibrio',
      icon: <Eye size={40} className="text-emerald-400" />,
      desc: 'Distant Horizons a 200 bloques con calidad vertical alta y shader E-LITE con niebla y nubes volumétricas. Horizonte enorme sin castigar los FPS.',
      features: ['Los 68 mods del pack', 'Shader E-LITE', 'Distant Horizons radio 200', 'Calidad vertical HIGH', 'Render distance 12'],
      performance: {
        fps: 'mín. 68', media: '89',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop en modo ahorro',
        usage: 'GPU 92% · CPU 37% · RAM 7,8 GB · VRAM 1,2 GB',
        dh: 'Activado (radio 200)',
        resolution: '1080p'
      },
      screenshot: intermediaImg,
      capturas: [ { src: intermediaImg, label: 'E-LITE', fps: '89 FPS' } ],
      videos: [],
      downloadUrl: 'https://github.com/iaguito22/serverAgosto2026/releases/download/v1/intermedia.zip'
    },
    calidad: {
      id: 'calidad',
      title: 'Calidad — lo más bonito',
      icon: <Sparkles size={40} className="text-emerald-400" />,
      desc: 'Tres shaders pesados configurados: Photon por defecto, con BSL y Solas listos para cambiar. Distant Horizons a 300 bloques.',
      features: ['Los 68 mods del pack', 'Photon (por defecto)', 'BSL y Solas incluidos', 'Distant Horizons radio 300', 'Render distance 11'],
      performance: {
        fps: 'Photon 55 · BSL 57 · Solas 52', media: '55',
        ram: 'mínimo 8 GB, recomendado 12 GB',
        gpu: 'RTX 3050 Laptop en modo ahorro',
        usage: 'GPU 79% · CPU 41% · RAM 7,4 GB · VRAM 1,1 GB',
        dh: 'Activado (radio 300)',
        resolution: '1080p'
      },
      screenshot: calidadImg,
      capturas: [
        { src: calPhotonImg, label: 'Photon (por defecto)', fps: '55 FPS' },
        { src: calBslImg, label: 'BSL', fps: '57 FPS' },
        { src: calSolasImg, label: 'Solas', fps: '52 FPS' }
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

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-stretch w-full px-4">
          {/* Content Card */}
          <div className="flex-1 glass-card !p-8 md:!p-10 border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-3 w-1.5 h-[calc(100%-32px)] bg-emerald-500/40 rounded-full"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Box className="text-emerald-400" size={18} /> Contenido
            </h4>
            <ul className="space-y-4 flex-1">
              {selectedPack.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40"></div>
                  {f}
                </li>
              ))}
            </ul>
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
                      <div className="text-5xl font-black text-white leading-none pt-2">
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
                <div className="flex flex-col gap-1 col-span-2 mb-2">
                  <span className="text-label text-emerald-400">RAM (Prueba):</span>
                  <span className="text-xl text-white font-black">{selectedPack.performance.ram}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Uso Sistema:</span>
                  <span className="text-value">{selectedPack.performance.usage}</span>
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

        <div className="w-full mb-12 mt-10 px-4">
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
              onClick={() => setActiveTab('acerca')}
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
        Las cuatro variantes llevan exactamente los mismos 68 mods: lo único que cambia es la configuración.
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
            <p className="text-sm text-secondary">Atmosfera, Particle Rain, Immersive Storms, Subtle Effects, Wakes, Visuality, Cosy Critters y 14 resource packs.</p>
          </div>
          <div className="pt-4">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-2"><Monitor size={18} /> Shaders</h4>
            <p className="text-sm text-secondary">Iris con Complementary Unbound, Photon, Solas y E-LITE, cada uno con su configuración ya ajustada.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="glass-card">
      <h3 className="text-2xl mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <AlertTriangle className="text-emerald-400" /> Antes de quejarte de los FPS
      </h3>
      <p className="text-secondary leading-relaxed mb-4">
        Todas las cifras están medidas con el portátil <span className="theme-text-primary font-bold">en modo ahorro</span>:
        la GPU corría a 795 MHz de los 2100 que puede dar. Si tu equipo está en modo rendimiento, esperarás bastante más.
      </p>
      <p className="text-secondary leading-relaxed">
        Y si cambias entre pantalla completa y ventana con shaders activos, Distant Horizons se corrompe:
        pulsa <span className="theme-text-primary font-bold">R</span> para que Iris recargue el pipeline y vuelve a la normalidad.
      </p>
    </section>

    <section className="glass-card">
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
            <div>· <span className="theme-text-primary font-bold">Windows</span>: doble clic en <code>INSTALAR-WINDOWS.bat</code></div>
            <div>· <span className="theme-text-primary font-bold">Linux</span>: doble clic en <code>instalar-linux.sh</code>, o en una terminal <code>bash instalar-linux.sh</code></div>
          </div>
        </li>
        <li>Se abre una ventana negra que te va contando lo que hace y se cierra sola. Ya está.</li>
        <li>En el launcher, dale al menos <span className="theme-text-primary font-bold">8 GB de RAM</span> al juego (12 si puedes) y elige el perfil de Fabric.</li>
      </ol>

      <div className="mt-8 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
        <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2"><Shield size={18} /> Tus cosas no se pierden</h4>
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
          ¿Te arrepientes? En la misma carpeta tienes <code>RESTAURAR-WINDOWS.bat</code> y{' '}
          <code>restaurar-linux.sh</code>: devuelven tus carpetas de antes tal y como estaban,
          y apartan las del modpack por si quieres volver a ponerlas.
        </p>
      </div>

      <div className="mt-6 p-6 rounded-2xl border border-white/10">
        <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-200"><AlertTriangle size={18} className="text-emerald-400" /> Si el terreno lejano se ve roto</h4>
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
