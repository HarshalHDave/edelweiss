import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface ColumnSelectorProps {
	columns: string[];
	target: React.MutableRefObject<HTMLDivElement | undefined>;
	onChange: (visibleColumns: string[]) => void;
}

export default function ColumnSelector(props: ColumnSelectorProps) {
	const [contextMenu, setContextMenu] = useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const [columns, setColumns] = useState<Map<string, boolean>>(
		new Map(props.columns.map((c) => [c, true]))
	);

	useEffect(() => {
		if (props.target.current == undefined) return;
		props.target.current.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			setContextMenu(
				contextMenu === null
					? {
							mouseX: event.clientX + 2,
							mouseY: event.clientY - 6,
					  }
					: null
			);
		});
	}, [props.target.current]);

	useEffect(() => {
		const visibleColumns: string[] = [];
		columns.forEach((visible, label) => {
			if (visible) visibleColumns.push(label);
		});
		props.onChange(visibleColumns);
	}, [columns]);

	const handleClose = () => {
		setContextMenu(null);
	};

	const checkboxes: React.ReactNode[] = [];
	columns.forEach((checked, label) => {
		checkboxes.push(
			<MenuItem key={label}>
				<FormControlLabel
					control={
						<Checkbox
							// sx={{
							// 	px: 3,
							// }}
							{...{ checked }}
							onChange={(e, new_checked) => {
								columns.set(label, new_checked);
								setColumns(new Map(columns));
							}}
						/>
					}
					{...{ label }}
				/>
			</MenuItem>
		);
	});

	return (
		<Menu
			open={contextMenu !== null}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={
				contextMenu !== null
					? { top: contextMenu.mouseY, left: contextMenu.mouseX }
					: undefined
			}
		>
			<FormGroup>{checkboxes}</FormGroup>
		</Menu>
	);
}
