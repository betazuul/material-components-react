import React from 'react';
import { storiesOf } from '@storybook/react';

import { LayoutGrid, LayoutGridCell, LayoutGridInner } from '..';
import '../layout-grid.scss';
import './LayoutGrid.stories.scss';

storiesOf('Layout Grid', module)
  .add('Basic', () => (
    <LayoutGrid className="demo-grid">
      <LayoutGridInner>
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
      </LayoutGridInner>
    </LayoutGrid>
  ))
  .add('Columns', () => (
    <LayoutGrid className="demo-grid">
      <LayoutGridInner>
        <LayoutGridCell className="demo-cell" span={6} />
        <LayoutGridCell className="demo-cell" span={3} />
        <LayoutGridCell className="demo-cell" span={2} />
        <LayoutGridCell className="demo-cell" span={1} />
        <LayoutGridCell className="demo-cell" span={3} />
        <LayoutGridCell className="demo-cell" span={1} />
        <LayoutGridCell className="demo-cell" span={8} />
      </LayoutGridInner>
    </LayoutGrid>
  ))
  .add('Grid Left Alignment', () => (
    <LayoutGrid className="demo-grid demo-grid--alignment" align="left">
      <LayoutGridInner>
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
      </LayoutGridInner>
    </LayoutGrid>
  ))
  .add('Grid Right Alignment', () => (
    <LayoutGrid className="demo-grid demo-grid--alignment" align="right">
      <LayoutGridInner>
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
        <LayoutGridCell className="demo-cell" />
      </LayoutGridInner>
    </LayoutGrid>
  ))
  .add('Cell Alignment', () => (
    <LayoutGrid className="demo-grid demo-grid--cell-alignment" align="right">
      <LayoutGridInner className="demo-inner">
        <LayoutGridCell
          className="demo-cell demo-cell--alignment"
          align="top"
        />
        <LayoutGridCell
          className="demo-cell demo-cell--alignment"
          align="middle"
        />
        <LayoutGridCell
          className="demo-cell demo-cell--alignment"
          align="bottom"
        />
      </LayoutGridInner>
    </LayoutGrid>
  ));
