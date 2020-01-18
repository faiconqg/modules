import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export const useGenericContainerStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  xs: {
    minHeight: 40
  },
  sm: {
    minHeight: 80
  },
  md: {
    minHeight: 160
  },
  lg: {
    minHeight: 320
  },
  xl: {
    minHeight: 640
  },
  xsMax: {
    maxHeight: 40
  },
  smMax: {
    maxHeight: 80
  },
  mdMax: {
    maxHeight: 160
  },
  lgMax: {
    maxHeight: 320
  },
  xlMax: {
    maxHeight: 640
  },
  xsFix: {
    minHeight: 40
  },
  smFix: {
    height: 80
  },
  mdFix: {
    height: 160
  },
  lgFix: {
    height: 320
  },
  xlFix: {
    height: 640
  },
  xsW: {
    minWidth: 40
  },
  smW: {
    minWidth: 80
  },
  mdW: {
    minWidth: 160
  },
  lgW: {
    minWidth: 320
  },
  xlW: {
    minWidth: 640
  },
  xsMaxW: {
    maxWidth: 40
  },
  smMaxW: {
    maxWidth: 80
  },
  mdMaxW: {
    maxWidth: 160
  },
  lgMaxW: {
    maxWidth: 320
  },
  xlMaxW: {
    maxWidth: 640
  },
  xsFixW: {
    minWidth: 40
  },
  smFixW: {
    width: 80
  },
  mdFixW: {
    width: 160
  },
  lgFixW: {
    width: 320
  },
  xlFixW: {
    width: 640
  },
  flex: {
    display: 'flex'
  },
  full: {
    flex: 1
  },
  shrink: {
    flexShrink: 0
  },
  jflexStart: {
    justifyContent: 'flex-start'
  },
  jcenter: {
    justifyContent: 'center'
  },
  jflexEnd: {
    justifyContent: 'flex-end'
  },
  jspaceBetween: {
    justifyContent: 'space-between'
  },
  jspaceAround: {
    justifyContent: 'space-around'
  },
  jspaceEvenly: {
    justifyContent: 'space-evenly'
  },
  cstretch: {
    alignContent: 'stretch'
  },
  ccenter: {
    alignContent: 'center'
  },
  cflexStart: {
    alignContent: 'flex-start'
  },
  cflexEnd: {
    alignContent: 'flex-end'
  },
  cspaceBetween: {
    alignContent: 'space-between'
  },
  cspaceAround: {
    alignContent: 'space-around'
  },
  iflexStart: {
    alignItems: 'flex-start'
  },
  icenter: {
    alignItems: 'center'
  },
  iflexEnd: {
    alignItems: 'flex-end'
  },
  istretch: {
    alignItems: 'stretch'
  },
  ibaseline: {
    alignItems: 'baseline'
  },
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  column: {
    flexDirection: 'column'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
  },
  nowrap: {
    flexWrap: 'nowrap'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  wrapReverse: {
    flexWrap: 'wrap-reverse'
  },
  inherit: {
    color: 'inherit'
  },
  primary: {
    color: theme.palette.primary.main
  },
  primaryLight: {
    color: theme.palette.primary.light
  },
  primaryDark: {
    color: theme.palette.primary.dark
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  secondaryLight: {
    color: theme.palette.secondary.light
  },
  secondaryDark: {
    color: theme.palette.secondary.dark
  },
  pspacing1: {
    padding: theme.spacing(1)
  },
  pspacing2: {
    padding: theme.spacing(2)
  },
  pspacing3: {
    padding: theme.spacing(3)
  },
  pspacing4: {
    padding: theme.spacing(4)
  },
  prspacing1: {
    paddingRight: theme.spacing(1)
  },
  prspacing2: {
    paddingRight: theme.spacing(2)
  },
  prspacing3: {
    paddingRight: theme.spacing(3)
  },
  prspacing4: {
    paddingRight: theme.spacing(4)
  },
  plspacing1: {
    paddingLeft: theme.spacing(1)
  },
  plspacing2: {
    paddingLeft: theme.spacing(2)
  },
  plspacing3: {
    paddingLeft: theme.spacing(3)
  },
  plspacing4: {
    paddingLeft: theme.spacing(4)
  },
  ptspacing1: {
    paddingTop: theme.spacing(1)
  },
  ptspacing2: {
    paddingTop: theme.spacing(2)
  },
  ptspacing3: {
    paddingTop: theme.spacing(3)
  },
  ptspacing4: {
    paddingTop: theme.spacing(4)
  },
  pbspacing1: {
    paddingBottom: theme.spacing(1)
  },
  pbspacing2: {
    paddingBottom: theme.spacing(2)
  },
  pbspacing3: {
    paddingBottom: theme.spacing(3)
  },
  pbspacing4: {
    paddingBottom: theme.spacing(4)
  },
  mspacing1: {
    margin: theme.spacing(1)
  },
  mspacing2: {
    margin: theme.spacing(2)
  },
  mspacing3: {
    margin: theme.spacing(3)
  },
  mspacing4: {
    margin: theme.spacing(4)
  },
  mrspacing1: {
    marginRight: theme.spacing(1)
  },
  mrspacing2: {
    marginRight: theme.spacing(2)
  },
  mrspacing3: {
    marginRight: theme.spacing(3)
  },
  mrspacing4: {
    marginRight: theme.spacing(4)
  },
  mlspacing1: {
    marginLeft: theme.spacing(1)
  },
  mlspacing2: {
    marginLeft: theme.spacing(2)
  },
  mlspacing3: {
    marginLeft: theme.spacing(3)
  },
  mlspacing4: {
    marginLeft: theme.spacing(4)
  },
  mtspacing1: {
    marginTop: theme.spacing(1)
  },
  mtspacing2: {
    marginTop: theme.spacing(2)
  },
  mtspacing3: {
    marginTop: theme.spacing(3)
  },
  mtspacing4: {
    marginTop: theme.spacing(4)
  },
  mbspacing1: {
    marginBottom: theme.spacing(1)
  },
  mbspacing2: {
    marginBottom: theme.spacing(2)
  },
  mbspacing3: {
    marginBottom: theme.spacing(3)
  },
  mbspacing4: {
    marginBottom: theme.spacing(4)
  }
}))

export const useGenericContainerClasses = ({
  fullWidth,
  fullHeight,
  minHeight,
  maxHeight,
  height,
  minWidth,
  maxWidth,
  width,
  className,
  flex,
  full,
  shrink,
  justify,
  direction,
  wrap,
  alignContent,
  alignItems,
  color,
  padding,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  margin,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  ...props
}: IGenericContainer) => {
  const classes = useGenericContainerStyles()

  return [
    ' ' +
      clsx(
        fullWidth && classes.fullWidth,
        fullHeight && classes.fullHeight,
        height &&
          classes[
            (height + 'Fix') as 'xsFix' | 'smFix' | 'mdFix' | 'lgFix' | 'xlFix'
          ],
        minHeight && classes[minHeight],
        maxHeight &&
          classes[
            (maxHeight + 'Max') as
              | 'xsMax'
              | 'smMax'
              | 'mdMax'
              | 'lgMax'
              | 'xlMax'
          ],
        width &&
          classes[
            (width + 'FixW') as
              | 'xsFixW'
              | 'smFixW'
              | 'mdFixW'
              | 'lgFixW'
              | 'xlFixW'
          ],
        minWidth &&
          classes[(minWidth + 'W') as 'xsW' | 'smW' | 'mdW' | 'lgW' | 'xlW'],
        maxWidth &&
          classes[
            (maxWidth + 'MaxW') as
              | 'xsMaxW'
              | 'smMaxW'
              | 'mdMaxW'
              | 'lgMaxW'
              | 'xlMaxW'
          ],
        justify &&
          classes[
            ('j' + justify) as
              | 'jflexStart'
              | 'jcenter'
              | 'jflexEnd'
              | 'jspaceBetween'
              | 'jspaceAround'
              | 'jspaceEvenly'
          ],
        direction && classes[direction],
        alignContent &&
          classes[
            ('c' + alignContent) as
              | 'cstretch'
              | 'ccenter'
              | 'cflexStart'
              | 'cflexEnd'
              | 'cspaceBetween'
              | 'cspaceAround'
          ],
        alignItems &&
          classes[
            ('i' + alignItems) as
              | 'iflexStart'
              | 'icenter'
              | 'iflexEnd'
              | 'istretch'
              | 'ibaseline'
          ],
        wrap && classes[wrap],
        color && classes[color],
        flex && classes.flex,
        full && classes.full,
        shrink && classes.shrink,
        padding &&
          classes[
            ('p' + padding) as
              | 'pspacing1'
              | 'pspacing2'
              | 'pspacing3'
              | 'pspacing4'
          ],
        paddingRight &&
          classes[
            ('pr' + paddingRight) as
              | 'prspacing1'
              | 'prspacing2'
              | 'prspacing3'
              | 'prspacing4'
          ],
        paddingLeft &&
          classes[
            ('pl' + paddingLeft) as
              | 'plspacing1'
              | 'plspacing2'
              | 'plspacing3'
              | 'plspacing4'
          ],
        paddingTop &&
          classes[
            ('pt' + paddingTop) as
              | 'ptspacing1'
              | 'ptspacing2'
              | 'ptspacing3'
              | 'ptspacing4'
          ],
        paddingBottom &&
          classes[
            ('pb' + paddingBottom) as
              | 'pbspacing1'
              | 'pbspacing2'
              | 'pbspacing3'
              | 'pbspacing4'
          ],
        margin &&
          classes[
            ('m' + margin) as
              | 'mspacing1'
              | 'mspacing2'
              | 'mspacing3'
              | 'mspacing4'
          ],
        marginRight &&
          classes[
            ('mr' + marginRight) as
              | 'mrspacing1'
              | 'mrspacing2'
              | 'mrspacing3'
              | 'mrspacing4'
          ],
        marginLeft &&
          classes[
            ('ml' + marginLeft) as
              | 'mlspacing1'
              | 'mlspacing2'
              | 'mlspacing3'
              | 'mlspacing4'
          ],
        marginTop &&
          classes[
            ('mt' + marginTop) as
              | 'mtspacing1'
              | 'mtspacing2'
              | 'mtspacing3'
              | 'mtspacing4'
          ],
        marginBottom &&
          classes[
            ('mb' + marginBottom) as
              | 'mbspacing1'
              | 'mbspacing2'
              | 'mbspacing3'
              | 'mbspacing4'
          ],
        className
      ),
    props
  ] as [string, object]
}

export interface IGenericContainer extends React.HTMLProps<HTMLDivElement> {
  fullWidth?: boolean
  fullHeight?: boolean
  minHeight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  maxHeight?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  minWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  flex?: boolean
  full?: boolean
  shrink?: boolean
  padding?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  paddingRight?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  paddingLeft?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  paddingTop?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  paddingBottom?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  margin?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  marginRight?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  marginLeft?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  marginTop?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  marginBottom?: 'spacing1' | 'spacing2' | 'spacing3' | 'spacing4'
  justify?:
    | 'flexStart'
    | 'center'
    | 'flexEnd'
    | 'spaceBetween'
    | 'spaceAround'
    | 'spaceEvenly'
  direction?: 'row' | 'rowReverse' | 'column' | 'columnReverse'
  wrap?: 'nowrap' | 'wrap' | 'wrapReverse'
  alignContent?:
    | 'stretch'
    | 'center'
    | 'flexStart'
    | 'flexEnd'
    | 'spaceBetween'
    | 'spaceAround'
  alignItems?: 'flexStart' | 'center' | 'flexEnd' | 'stretch' | 'baseline'
  color?:
    | 'inherit'
    | 'primary'
    | 'primaryLight'
    | 'primaryDark'
    | 'secondary'
    | 'secondaryLight'
    | 'secondaryDark'
}

const Div: React.FC<IGenericContainer> = props => {
  const [classNames, rest] = useGenericContainerClasses(props)

  return <div {...rest} className={classNames} />
}

export default Div
