type TermsModalProps = {
    onClose: () => void;
  };
  
  export default function TermsModal({ onClose }: TermsModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
        <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-8 text-white shadow-[0_0_80px_rgba(37,99,235,0.25)]">
          <h2 className="text-2xl font-bold">Termos de Uso</h2>
  
          <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-400">
            <p>
              Ao criar uma conta no Apex, você concorda com estes Termos de Uso.
            </p>
  
            <p>
              O Apex é uma plataforma voltada ao acompanhamento de treino,
              nutrição, sono e evolução física.
            </p>
  
            <p>
              As recomendações fornecidas pelo Apex possuem caráter informativo e
              não substituem acompanhamento médico, nutricional ou profissional de
              educação física.
            </p>
  
            <p>
              O usuário é responsável por fornecer informações verdadeiras e por
              manter sua conta e senha em segurança.
            </p>
  
            <p>
              O Apex poderá passar por atualizações, melhorias ou alterações
              conforme a evolução do projeto.
            </p>
          </div>
  
          <button
            type="button"
            onClick={onClose}
            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }