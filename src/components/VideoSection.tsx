const VideoSection = () => {
  return (
    <section id="video" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Veja Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra como nossa plataforma pode transformar sua forma de estudar
              e acelerar seu aprendizado
            </p>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              {/* Placeholder for video - replace with actual video embed */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4 hover:scale-110 transition-transform cursor-pointer">
                  <svg
                    className="w-10 h-10 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">
                  Vídeo explicativo em breve
                </p>
                {/* To add a real video, replace this div with:
                  <iframe
                    className="w-full h-full"
                    src="YOUR_VIDEO_URL"
                    title="Video explicativo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
