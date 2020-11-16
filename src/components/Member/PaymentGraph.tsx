import React, { FC, useMemo } from 'react';
import cx from 'classnames';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { useTooltip, Tooltip } from '@visx/tooltip';
import { scaleLinear, scaleBand } from '@visx/scale';
import { SectorContribution } from '../../models/Contribution';
import { Party } from '../../models/Legislator';

// Styles
import './PaymentGraph.scss';

interface PaymentGraphProps {
  width: number;
  height: number;
  contributions: readonly SectorContribution[];
  legislatorParty: Party;
  maxContribution: number;
}

interface MoneyBucket {
  factor: number;
  label: string;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const dollarBucket = (amount: number): MoneyBucket => {
  if (amount >= 1000000000) {
    return { factor: 1000000000, label: 'B' };
  } else if (amount >= 1000000) {
    return { factor: 1000000, label: 'M' };
  } else if (amount >= 1000) {
    return { factor: 1000, label: 'K' };
  } else {
    return { factor: 1, label: '' };
  }
};

const condenseFormat = (amount: number) => {
  const { factor, label } = dollarBucket(amount);
  return formatter.format(amount / factor) + label;
};

const upgradeMax = (amount: number) => {
  const { factor } = dollarBucket(amount);
  return Math.ceil(amount / factor) * factor + 0.25 * factor;
};

const margin = { top: 0, bottom: 30, left: 20, right: 0 };
const y: Accessor<string> = (contribution) => contribution.sectorCode;
const x: Accessor<number> = (contribution) => contribution.amount;

type Accessor<T> = (contribution: SectorContribution) => T;

export const PaymentGraph: FC<PaymentGraphProps> = (props) => {
  const {
    width,
    height,
    contributions,
    maxContribution,
    legislatorParty,
  } = props;
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<SectorContribution>();
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;
  const amountScale = useMemo(
    () =>
      scaleLinear({
        range: [0, graphWidth],
        round: true,
        domain: [0, upgradeMax(maxContribution)],
      }),
    [graphWidth, maxContribution]
  );
  const sectorScale = useMemo(
    () =>
      scaleBand({
        range: [0, graphHeight],
        round: true,
        domain: contributions.map(y),
        padding: 0.4,
      }),
    [graphHeight, contributions]
  );
  const sortedContributions = useMemo(
    () => contributions.concat([]).sort(compareSectorContribution),
    [contributions]
  );
  const getAmountWidth = (data: SectorContribution) => amountScale(x(data));
  const getBarY = (data: SectorContribution) => sectorScale(y(data));
  const graphClasses = cx({
    'payments--republican': legislatorParty === Party.Republican,
    'payments--independent': legislatorParty === Party.Independent,
    'payments--democrat': legislatorParty === Party.Democrat,
  });
  return (
    <div className="payments--graph">
      <svg width={width} height={height} className={graphClasses}>
        <Group width={width} height={height}>
          {sortedContributions.map((contribution) => {
            return (
              <Group key={`bar-${contribution.sectorCode}`}>
                <Bar
                  x={margin.left}
                  y={getBarY(contribution)}
                  height={sectorScale.bandwidth()}
                  width={getAmountWidth(contribution)}
                  onMouseLeave={hideTooltip}
                  onMouseEnter={() => {
                    showTooltip({
                      tooltipData: contribution,
                      tooltipTop: getBarY(contribution),
                      tooltipLeft: getAmountWidth(contribution),
                    });
                  }}
                />
              </Group>
            );
          })}
          <AxisLeft
            hideTicks
            left={margin.left}
            scale={sectorScale}
            stroke="#ffffff"
            tickStroke="#ffffff"
            tickLabelProps={() => ({
              fill: '#ffffff',
              fontSize: 13,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
          <AxisBottom
            top={graphHeight}
            left={margin.left}
            scale={amountScale}
            numTicks={5}
            tickLength={4}
            stroke="#ffffff"
            tickStroke="#ffffff"
            tickFormat={(amount) => condenseFormat(amount.valueOf())}
            tickLabelProps={() => ({
              fill: '#ffffff',
              fontSize: 13,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData !== undefined && (
        <Tooltip
          // set this to random so it correctly updates with parent bounds
          key={`tooltip-${tooltipData.sectorCode}`}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <strong>
            {tooltipData.sector} ({tooltipData.sectorCode})
          </strong>
          <span>{formatter.format(tooltipData.amount)}</span>
        </Tooltip>
      )}
    </div>
  );
};

/**
 * Compare two `SectorContribution` records in order to sort them.
 * @param a the first record
 * @param b the second record
 * @returns -1 if `a` is sorted before `b`, 1 if `a` is sorted after `b`, 0 if
 * `a` and `b` should be left in their current order.
 */
const compareSectorContribution = (
  a: SectorContribution,
  b: SectorContribution
): number => {
  if (a.sectorCode < b.sectorCode) {
    return -1;
  } else if (a.sectorCode > b.sectorCode) {
    return 1;
  } else {
    return 0;
  }
};
