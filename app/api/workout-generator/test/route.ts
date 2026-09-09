import { NextResponse } from "next/server";
import { getUserWorkoutPlan } from "@/lib/workout-generator/getUserWorkoutPlan";

export async function GET() {
  try {
    const workoutPlan = await getUserWorkoutPlan();

    return NextResponse.json({
      success: true,
      plan: workoutPlan,
    });
  } catch (error) {
    console.error("WORKOUT GENERATOR ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao gerar treino.",
      },
      { status: 500 }
    );
  }
}