import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formData, setFormData] = useState(defaultArticleState);

	const rootRef = useRef<HTMLDivElement>(null);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		onApply(formData);
	};

	const onReset = (e: React.FormEvent) => {
		e.preventDefault();

		onApply(defaultArticleState);

		setFormData(defaultArticleState);
	};

	useEffect(() => {
		if (!isSidebarOpen) return;

		const onClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', onClickOutside);
		return () => {
			document.removeEventListener('mousedown', onClickOutside);
		};
	}, [isSidebarOpen]);

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formData.fontFamilyOption}
						onChange={(value) =>
							setFormData({ ...formData, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formData.fontSizeOption}
						onChange={(value) =>
							setFormData({ ...formData, fontSizeOption: value })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formData.fontColor}
						onChange={(value) => setFormData({ ...formData, fontColor: value })}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formData.backgroundColor}
						onChange={(value) =>
							setFormData({ ...formData, backgroundColor: value })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formData.contentWidth}
						onChange={(value) =>
							setFormData({ ...formData, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
