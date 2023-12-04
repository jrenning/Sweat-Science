<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
	import ExerciseSelectionForm from "../../../components/Exercises/ExerciseSelectionForm.svelte";
	import type { PageData } from "./$types";

    export let data: PageData

    const modal = getModalStore()


	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { exercise_options: data.exercise_choices, data: data.exerciseForm, post_link: "/add_workout?/add_exercise" }
	};
	const exerciseModal: ModalSettings = {
		type: 'component',
		title: 'Add Exercise',
		component: modalComponentExercise
	};


    modal.trigger(exerciseModal)
</script>

<div>

</div>

