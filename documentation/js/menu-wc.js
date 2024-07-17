'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-template documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiPermissionModule.html" data-type="entity-link" >ApiPermissionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"' : 'data-bs-target="#xs-injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"' :
                                        'id="xs-injectables-links-module-ApiPermissionModule-10a5feea140e9c88b9b35565d48dac543efdede5c9f59cf015ecc47ff06605875fe3db9a1294302d09def02fdffadca2b2b1d1d8256e527408e420052f9e419f"' }>
                                        <li class="link">
                                            <a href="injectables/ApiPermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiPermissionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' : 'data-bs-target="#xs-controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' :
                                            'id="xs-controllers-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' }>
                                            <li class="link">
                                                <a href="controllers/IamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' : 'data-bs-target="#xs-injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' :
                                        'id="xs-injectables-links-module-IamModule-019a84992efdf36bcbf26c9b82fe0b092c83586575a2beb32e0e7ee8f10f59662c9d219404f05295889844d03cd3169522243eeac9650ae8c53a47a3b7b83031"' }>
                                        <li class="link">
                                            <a href="injectables/IamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IamService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionModule.html" data-type="entity-link" >PermissionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' : 'data-bs-target="#xs-controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' :
                                            'id="xs-controllers-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' : 'data-bs-target="#xs-injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' :
                                        'id="xs-injectables-links-module-PermissionModule-c6e766e2a91f99c1666946edd754e348516d3414d8653ea1fa8cee505606cb347b7765e45d9cb276094e37789771723d3ea84efdfb5d912f4b3d6194820dbdb9"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' : 'data-bs-target="#xs-controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' :
                                            'id="xs-controllers-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' : 'data-bs-target="#xs-injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' :
                                        'id="xs-injectables-links-module-RoleModule-edaf9aec3742cd7ae303ae0393008916f7e26b4d496134170dd64fc54ab2099277e16ebfbc3895e13563a1a3cf0356f92ffc2f984fb7f0151472a1295209febf"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' : 'data-bs-target="#xs-controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' :
                                            'id="xs-controllers-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' : 'data-bs-target="#xs-injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' :
                                        'id="xs-injectables-links-module-UserModule-ab4404b9649986f224cf2bf0d1cc6fceeb5b6bb6e8d85362a82d732e0fed51bed629f8094625ce0ec06a7132afb585ebd75a7451bc416b8a3077b164c7848551"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/ApiPermissionController.html" data-type="entity-link" >ApiPermissionController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiPermission.html" data-type="entity-link" >ApiPermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiPermission-1.html" data-type="entity-link" >ApiPermission</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiPermissionGroup.html" data-type="entity-link" >ApiPermissionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiPermissionGroup-1.html" data-type="entity-link" >ApiPermissionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitUtil.html" data-type="entity-link" >InitUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/OperationLog.html" data-type="entity-link" >OperationLog</a>
                            </li>
                            <li class="link">
                                <a href="classes/OperationLog-1.html" data-type="entity-link" >OperationLog</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationApiPermissionDto.html" data-type="entity-link" >PaginationApiPermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationPermissionDto.html" data-type="entity-link" >PaginationPermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationRoleDto.html" data-type="entity-link" >PaginationRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationUserDto.html" data-type="entity-link" >PaginationUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission-1.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionGroup.html" data-type="entity-link" >PermissionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionGroup-1.html" data-type="entity-link" >PermissionGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profile-1.html" data-type="entity-link" >Profile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role-1.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="classes/Session-1.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestHelper.html" data-type="entity-link" >TestHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateApiPermissionDto.html" data-type="entity-link" >UpdateApiPermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/User-1.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApiPermissionGuard.html" data-type="entity-link" >ApiPermissionGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAppConfig.html" data-type="entity-link" >IAppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Route.html" data-type="entity-link" >Route</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToEntity.html" data-type="entity-link" >ToEntity</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});