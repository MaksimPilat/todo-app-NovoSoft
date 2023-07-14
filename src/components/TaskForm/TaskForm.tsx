import { useDispatch } from 'react-redux';
import styles from './TaskForm.module.css';
import { useEffect, useRef } from 'react';
import { updateTaskEditorAction } from '../../store/reducers/taskEditorReducer';
import { GradientButton } from '..';
import { updateTaskAction } from '../../store/reducers/taskListReducer';

interface Props {
    placeHolder: string,
    btnText: string,
    func: (title: string) => void,
    task?: { id: number, title: string }
}

export const TaskForm: React.FC<Props> = ({ placeHolder, btnText, func, task }: Props) => {

    const inputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch();

    const onHandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        func(inputRef.current.value);
        inputRef.current.value = '';
        if (task) {
            dispatch(updateTaskEditorAction(task.id));
        }
    }

    useEffect(() => {
        if (task) {
            if (!task.title) dispatch(updateTaskEditorAction());
            inputRef.current.value = task.title;
            inputRef.current.focus();
        }
    }, [task]);

    return (
        <form
            className={styles.root}
            onSubmit={event => onHandleSubmit(event)} >
            <input
                onFocus={() => inputRef.current.placeholder = ''}
                onBlur={() => inputRef.current.placeholder = placeHolder}
                ref={inputRef}
                type='text'
                placeholder={placeHolder} />
            <GradientButton>
                {btnText}
            </GradientButton>
        </form>
    )
}