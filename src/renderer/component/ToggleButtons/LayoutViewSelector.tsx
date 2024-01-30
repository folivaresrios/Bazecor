// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import Styled from "styled-components";
import { i18n } from "@Renderer/i18n";

import Title from "../Title";
import { ButtonConfig } from "../Button";

import { IconEditModeStandardViewSm, IconEditModeSingleViewSm } from "../Icon";

const Style = Styled.div<{ isStandardView: boolean; layoutSelectorPosition: { x: number; y: number } }>`
&.layoutSelector {
  align-self: self-start;
  margin-top: auto;
  margin-bottom: 24px;
  padding-top: 16px;

  // WHY: We want to render the LayoutViewSelector directly above the KeyPickerKeyboard (and below the key editor)
  // when in single view.
  // Currently we only want this behaviour in the LayoutEditor, not in the SuperkeysEditor.
  // The SuperkeysEditor omits the _layoutSelectorPosition_ argument when rendering the LayoutViewSelector, so the
  // following statement will evaluate to false.
  // The layoutSelectorPosition will get updated by the KeyPickerKeyboard component and consists of the left and top
  // value of it's bounding box. It will be calculated on first draw and on resize.
  ${({ isStandardView, layoutSelectorPosition }) =>
    layoutSelectorPosition &&
    layoutSelectorPosition.x &&
    layoutSelectorPosition.y &&
    !isStandardView &&
    `
      position: absolute;
      left: ${layoutSelectorPosition.x}px;
      top: ${layoutSelectorPosition.y - 92}px;
    `}
}
.toggleButtonsContainer {
  padding: 4px;
  background: ${({ theme }) => theme.styles.toggleEditMode.containerBackground};
  border: ${({ theme }) => theme.styles.toggleEditMode.containerBorder};
  border-radius: 6px;
  .toggleButtonsInner {
    margin-left: -2px;
    margin-right: -2px;
    display: flex;
    flex-wrap: nowrap;
  }
}
.button-config {
  margin-left: 2px;
  margin-right: 2px;
  flex: auto;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.styles.toggleEditMode.buttonColor};
  background: ${({ theme }) => theme.styles.toggleEditMode.buttonBackground};
  box-shadow: ${({ theme }) => theme.styles.toggleEditMode.buttonBoxShadow};
  display: flex;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.styles.toggleEditMode.buttonBackgroundHover};
    color: ${({ theme }) => theme.styles.toggleEditMode.buttonColorHover};
    box-shadow: ${({ theme }) => theme.styles.toggleEditMode.buttonBoxShadow};
  }
  &.active {
    background: ${({ theme }) => theme.styles.toggleEditMode.buttonBackgroundActive};
    color: ${({ theme }) => theme.styles.toggleEditMode.buttonColorActive};
    box-shadow: ${({ theme }) => theme.styles.toggleEditMode.buttonBoxShadow};
  }
}
h5 {
  font-size: 10px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.styles.toggleEditMode.titleColor};
  margin-left: 4px;
  margin-bottom: 6px;
}
.icon-right svg {
  margin-left: 8px;
}
.icon-left svg {
  margin-right: 8px;
}
`;

interface LayoutViewSelectorProps {
  onToggle: (e: Event) => void;
  isStandardView: boolean;
  tooltip: HTMLElement | string | undefined;
  layoutSelectorPosition: { x: number; y: number };
}

function LayoutViewSelector(props: LayoutViewSelectorProps) {
  const { onToggle, isStandardView, tooltip, layoutSelectorPosition } = props;
  return (
    <Style className="layoutSelector" isStandardView={isStandardView} layoutSelectorPosition={layoutSelectorPosition}>
      <Title text={i18n.editor.editMode.title} headingLevel={5} tooltip={tooltip || undefined} tooltipIconSize="sm" />
      <div className="toggleButtonsContainer">
        <div className="toggleButtonsInner">
          <ButtonConfig
            onClick={onToggle}
            icoSVG={<IconEditModeStandardViewSm />}
            icoPosition="left"
            selected={isStandardView}
            buttonText={i18n.editor.editMode.standardView}
            size="sm"
            tooltip={undefined}
            tooltipPlacement={undefined}
            tooltipClassName={undefined}
            variation={undefined}
            tooltipDelay={undefined}
            disabled={undefined}
            dataAnimate={undefined}
          />
          <ButtonConfig
            onClick={onToggle}
            icoPosition="left"
            icoSVG={<IconEditModeSingleViewSm />}
            selected={!isStandardView}
            buttonText={i18n.editor.editMode.singleView}
            size="sm"
            tooltip={undefined}
            tooltipPlacement={undefined}
            tooltipClassName={undefined}
            variation={undefined}
            tooltipDelay={undefined}
            disabled={undefined}
            dataAnimate={undefined}
          />
        </div>
      </div>
    </Style>
  );
}

export default LayoutViewSelector;
