type PrivacyModalProps = {
    onClose: () => void;
  };
  
  export default function PrivacyModal({ onClose }: PrivacyModalProps) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm">
        <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-8 text-white shadow-[0_0_80px_rgba(37,99,235,0.25)]">
          <h2 className="text-2xl font-bold">Política de Privacidade</h2>
  
          <div className="mt-6 space-y-4 text-sm leading-6 text-zinc-400">
            <p>
              O Apex coleta informações fornecidas pelo usuário durante o cadastro
              e onboarding, como nome, email, idade, peso, altura, objetivo e
              preferências de treino.
            </p>
  
            <p>
              Esses dados são utilizados para personalizar a experiência dentro da
              plataforma e gerar recomendações mais adequadas ao perfil do usuário.
            </p>
  
            <p>
              Os dados são armazenados com auxílio do Supabase, seguindo boas
              práticas de segurança.
            </p>
  
            <p>
              O Apex não comercializa dados pessoais dos usuários.
            </p>
  
            <p>
              Futuramente, o usuário poderá solicitar alteração ou exclusão de seus
              dados conforme a evolução da plataforma.
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