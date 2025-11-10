<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
	import ExerciseSelectionForm from "../../../components/Exercises/ExerciseSelectionForm.svelte";
	import type { PageData } from "./$types";

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

    const modal = getModalStore()


	const modalComponentExercise: ModalComponent = {
		ref: ExerciseSelectionForm,
		props: { exercise_options: data.exercise_choices, data: data.exerciseForm, post_link: `/edit_exercise_routine/${data.exerciseForm?.data.id}` }
	};
	const exerciseModal: ModalSettings = {
		type: 'component',
		title: 'Edit Exercise',
		component: modalComponentExercise
	};


    modal.trigger(exerciseModal)
</script>

<div>

</div>

