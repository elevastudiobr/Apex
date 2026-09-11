import { redirect } from "next/navigation";
import { getUserWorkoutPlan } from "@/lib/workout-generator/getUserWorkoutPlan";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function WorkoutTestPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let plan;

  try {
    plan = await getUserWorkoutPlan();
  } catch (error) {
    console.error("WORKOUT GENERATION ERROR:", error);

    return (
      <main className="min-h-screen bg-[#050817] px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h1 className="text-xl font-semibold text-red-400">
              Erro ao gerar treino
            </h1>

            <p className="mt-3 text-sm text-zinc-400">
              O Apex encontrou um problema ao tentar gerar
              seu plano de treino.
            </p>

            <pre className="mt-5 overflow-x-auto rounded-xl bg-black/40 p-4 text-sm text-red-300">
              {error instanceof Error
                ? error.message
                : String(error)}
            </pre>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050817] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-medium text-indigo-400">
            APEX • MOTOR DE TREINO
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Plano gerado
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Esta página é temporária e serve para validar
            o algoritmo antes de conectarmos o treino ao
            Dashboard.
          </p>
        </div>

        {/* RESUMO */}
        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Plano
            </p>

            <p className="mt-2 font-semibold">
              {plan.name}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Divisão
            </p>

            <p className="mt-2 font-semibold">
              {plan.split}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Dias
            </p>

            <p className="mt-2 text-2xl font-bold">
              {plan.training_days}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Duração
            </p>

            <p className="mt-2 text-2xl font-bold">
              {plan.duration_minutes} min
            </p>
          </div>
        </section>

        {/* TREINOS */}
        <div className="space-y-6">
          {plan.workouts.map((workout) => (
            <section
              key={workout.workout_order}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
            >
              {/* WORKOUT HEADER */}
              <div className="border-b border-white/10 bg-white/[0.025] p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-indigo-400">
                      Treino {workout.workout_order}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      {workout.name}
                    </h2>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs text-zinc-500">
                      Tempo estimado
                    </p>

                    <p className="mt-1 font-semibold">
                      {workout.estimated_minutes} min
                    </p>
                  </div>
                </div>
              </div>

              {/* EXERCÍCIOS */}
              <div className="divide-y divide-white/5">
                {workout.exercises.length === 0 ? (
                  <div className="p-6 text-sm text-red-400">
                    Nenhum exercício foi selecionado.
                  </div>
                ) : (
                  workout.exercises.map(
                    (workoutExercise) => (
                      <div
                        key={workoutExercise.exercise.id}
                        className="p-5"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex items-start gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                              {
                                workoutExercise.exercise_order
                              }
                            </div>

                            <div>
                              <h3 className="font-medium">
                                {
                                  workoutExercise
                                    .exercise.name
                                }
                              </h3>

                              <p className="mt-1 text-sm text-zinc-500">
                                {
                                  workoutExercise
                                    .exercise.muscle_group
                                }

                                {workoutExercise.exercise
                                  .primary_muscle
                                  ? ` • ${workoutExercise.exercise.primary_muscle}`
                                  : ""}
                              </p>

                              {workoutExercise.notes && (
                                <p className="mt-2 text-xs text-indigo-400">
                                  {
                                    workoutExercise.notes
                                  }
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                            <div className="rounded-lg bg-black/20 px-3 py-2 text-center">
                              <p className="text-[10px] uppercase text-zinc-600">
                                Séries
                              </p>

                              <p className="mt-1 text-sm font-semibold">
                                {
                                  workoutExercise.sets
                                }
                              </p>
                            </div>

                            <div className="rounded-lg bg-black/20 px-3 py-2 text-center">
                              <p className="text-[10px] uppercase text-zinc-600">
                                Reps
                              </p>

                              <p className="mt-1 text-sm font-semibold">
                                {
                                  workoutExercise
                                    .reps_min
                                }
                                -
                                {
                                  workoutExercise
                                    .reps_max
                                }
                              </p>
                            </div>

                            <div className="rounded-lg bg-black/20 px-3 py-2 text-center">
                              <p className="text-[10px] uppercase text-zinc-600">
                                Descanso
                              </p>

                              <p className="mt-1 text-sm font-semibold">
                                {
                                  workoutExercise
                                    .rest_seconds
                                }
                                s
                              </p>
                            </div>

                            <div className="hidden rounded-lg bg-black/20 px-3 py-2 text-center sm:block">
                              <p className="text-[10px] uppercase text-zinc-600">
                                Tempo
                              </p>

                              <p className="mt-1 text-sm font-semibold">
                                {Math.ceil(
                                  workoutExercise.estimated_minutes
                                )}
                                min
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        {/* DEBUG */}
        <details className="mt-8 rounded-2xl border border-white/10 bg-black/20">
          <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-zinc-400">
            Dados completos gerados pelo Apex
          </summary>

          <pre className="overflow-x-auto border-t border-white/10 p-5 text-xs text-zinc-500">
            {JSON.stringify(plan, null, 2)}
          </pre>
        </details>
      </div>
    </main>
  );
}