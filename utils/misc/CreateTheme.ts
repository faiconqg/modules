import { createMuiTheme, Color } from '@material-ui/core'

export default function createTheme(primary: Color, secondary: Color) {
  let theme = createMuiTheme({
    palette: {
      primary,
      secondary,
      background: { default: '#eaeff1' }
    },
    typography: {
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5
      }
    },
    shape: {
      borderRadius: 8
    },
    props: {
      MuiTab: {
        disableRipple: true
      }
    },
    mixins: {
      toolbar: {
        minHeight: 48
      }
    }
  })

  theme = {
    ...theme,
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: '#18202c'
        }
      },
      MuiButton: {
        label: {
          textTransform: 'none'
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none'
          }
        }
      },
      MuiTabs: {
        scroller: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          width: `calc(100vw - ${window.drawerWidth}px)`,
          [theme.breakpoints.down('xs')]: {
            width: '100vw'
          }
        },
        flexContainer: {
          display: 'block'
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white
        }
      },
      MuiTab: {
        root: {
          textTransform: 'none',
          padding: 0,
          minWidth: 0,
          margin: '0 16px',
          [theme.breakpoints.up('md')]: {
            margin: '0 16px',
            padding: 0,
            minWidth: 0
          },
          [theme.breakpoints.down('md')]: {
            margin: '0 16px',
            padding: 0,
            minWidth: 0
          }
        }
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing(1)
        }
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4
        }
      },
      MuiDivider: {
        root: {
          backgroundColor: '#404854'
        }
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium
        }
      },
      MuiListItemIcon: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20
          }
        }
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32
        }
      }
    }
  }
  return theme
}
