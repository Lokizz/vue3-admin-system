export default {
  login: {
    title: 'User Login',
    loginBtn: 'Login',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits',
    desc: `
    Test authority account:<br />
     Provide three kinds of authority accounts:<br />
     1. Super administrator account: super-admin <br />
     2. Administrator account: admin <br />
     3. Test configurable account: test <br />
     The uniform password is: 123456 <br />
     <br />
     Import user account:<br />
     You can log in with the imported username <br />
     The password is unified as: 123456 <br />
     <b>Note: Import user-discriminatory Chinese and English libraries! ! ! ! </b>
    `
  },
  route: {
    profile: 'Profile',
    user: 'user',
    excelImport: 'ExcelImport',
    userManage: 'EmployeeManage',
    userInfo: 'UserInfo',
    roleList: 'RoleList',
    permissionList: 'PermissionList',
    article: 'article',
    articleRanking: 'ArticleRanking',
    articleCreate: 'ArticleCreate',
    articleDetail: 'ArticleDetail',
    articleEditor: 'ArticleEditor'
  },
  toast: {
    switchLangSuccess: 'Switch Language Success'
  },
  tagsView: {
    refresh: 'Refresh',
    closeRight: 'Close Rights',
    closeOther: 'Close Others'
  },
  theme: {
    themeColorChange: 'Theme Color Change',
    themeChange: 'Theme Change'
  },
  universal: {
    title: 'remind',
    confirm: 'confirm',
    cancel: 'cancel'
  },
  navBar: {
    themeChange: 'Theme Modification',
    headerSearch: 'Page Search',
    screenfull: 'Full Screen Replacement',
    lang: 'Globalization',
    guide: 'Function Guide',
    home: 'Home',
    course: 'Course homepage',
    logout: 'Log out'
  },
  guide: {
    close: 'close',
    next: 'next',
    prev: 'previous',
    guideTitle: 'guidance',
    guideDesc: 'Turn on the boot function',
    hamburgerTitle: 'Hamburger button',
    hamburgerDesc: 'Open and close the left menu',
    breadcrumbTitle: 'Bread crumbs',
    breadcrumbDesc: 'Indicates the current page position',
    searchTitle: 'search',
    searchDesc: 'Page link search',
    fullTitle: 'full screen',
    fullDesc: 'Page display switching',
    themeTitle: 'theme',
    themeDesc: 'Change project theme',
    langTitle: 'globalization',
    langDesc: 'Language switch',
    tagTitle: 'Label',
    tagDesc: 'Opened page tab',
    sidebarTitle: 'menu',
    sidebarDesc: 'Project function menu'
  },
  profile: {
    muted:
      'The demonstration of background management system by vue3 and element-plus',
    introduce: 'Introduce',
    projectIntroduction: 'Project Introduction',
    projectFunction: 'Project Function',
    feature: 'Feature',
    chapter: 'Chapter',
    author: 'Author',
    name: 'Eric Lok',
    job: 'Front-end developer',
    Introduction: `Proficient in using Vue3's Composition API with Vue Router, Vuex and Pinia for component development, familiar with the use of HTML, CSS and JavaScript technologies, and able to achieve responsive layout and multi-terminal adaptation compatibility without third-party libraries.

      Has a strong interest and enthusiasm for Web front-end and related technologies, and has self-taught including: Vue3 framework, uniapp framework, Element-Plus component library, Sa SS preprocessing and Axios packaging.
      
      With experience in graphic design, independent aesthetics for interface design and typography.`
  },
  userInfo: {
    print: 'Print',
    title: 'Employee information',
    name: 'name',
    sex: 'gender',
    nation: 'nationality',
    mobile: 'phone number',
    province: 'Place of residence',
    date: 'Entry Time',
    remark: 'Remark',
    address: 'contact address',
    experience: 'Experience',
    major: 'Professional',
    glory: 'Glory',
    foot: 'Signature:___________Date:___________'
  },
  uploadExcel: {
    upload: 'Click upload',
    drop: 'Drag files here'
  },
  excel: {
    importExcel: 'excel import',
    exportExcel: 'excel export',
    exportZip: 'zip export',
    name: 'Name',
    mobile: 'contact details',
    avatar: 'Avatar',
    role: 'Role',
    openTime: 'Opening time',
    action: 'Operate',
    show: 'Check',
    showRole: 'Role',
    defaultRole: 'Staff',
    remove: 'delete',
    removeSuccess: 'Deleted successfully',
    title: 'Export to excel',
    placeholder: 'excel file name',
    defaultName: 'Staff Management Form',
    close: 'Cancel',
    confirm: 'Export',
    importSuccess: ' Employee data imported successfully',
    dialogTitle1: 'Are you sure you want to delete the user ',
    dialogTitle2: ' Is it?',
    roleDialogTitle: 'Configure roles'
  },
  role: {
    buttonTxt: 'New Role',
    index: 'Serial number',
    name: 'name',
    desc: 'describe',
    action: 'operate',
    assignPermissions: 'assign permissions',
    removeRole: 'Delete role',
    dialogTitle: 'New role',
    dialogRole: 'Role Name',
    dialogDesc: 'Role description',
    updateRoleSuccess: 'User role updated successfully'
  },
  permission: {
    name: 'Authority name',
    mark: 'Authority ID',
    desc: 'Permission description'
  },
  article: {
    ranking: 'Ranking',
    title: 'Title',
    author: 'Author',
    publicDate: 'release time',
    desc: 'brief introduction',
    action: 'operate',
    dynamicTitle: 'Dynamic display',
    show: 'check',
    remove: 'delete',
    edit: 'edit',
    dialogTitle1: 'Are you sure you want to delete the article ',
    dialogTitle2: ' NS?',
    removeSuccess: 'Article deleted successfully',
    titlePlaceholder: 'Please enter the title of the article',
    markdown: 'Markdown',
    richText: 'Rich Text',
    commit: 'commit',
    createSuccess: 'The article was created successfully',
    editorSuccess: 'Article modified successfully',
    sortSuccess: 'Article ranking modified successfully'
  }
}
