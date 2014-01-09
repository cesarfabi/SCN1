// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ui.controller("sap.ushell.renderers.fiori2.launchpad.group_list.GroupList",{onInit:function(){this.sViewId="#"+this.getView().getId();this.sGroupListId="#"+this.getView().oGroupList.getId();jQuery(".sapUshellGroupList").data("dropGroup",null);this.iOutEventCounter=0;this.iOverEventCounter=0;this.iOutEventFlag=false},onAfterRendering:function(){this.jqView=jQuery(this.sViewId);this.jgGroupList=jQuery(this.sGroupListId);this.lastItemWithEditMode=null;jQuery("#__area1").appendTo("#shell-cntnt");var r=function(e){var a=jQuery(e.currentTarget),b=jQuery(".sapMSLITitleOnly"),c=jQuery(".sapUshellGroupLI").find(".sapMInput");b.css("width",(a.width()-parseInt(b.css("padding-left")))+"px");c.css("width",(a.width()-(2*parseInt(c.css("margin-left"))))+"px")};var j=jQuery("#groupList");j.unbind("resize",r);j.bind("resize",r);j.trigger("resize",[j.width(),j.height()])},onGroupTitleChange:function(e){this._publishAsync("launchpad","changeGroupTitle",{groupId:e.getSource().getGroupId(),newTitle:e.getParameter("newTitle")})},makeSortable:function(){this.jgGroupList=jQuery(this.sGroupListId);this._sortable()},_getJqAllListItems:function(){this.jqView=jQuery(this.sViewId);return this.jqView.find(".sapUshellGroupListItem")},_getJqGroupListItems:function(){this.jgGroupList=jQuery(this.sGroupListId);return this.jgGroupList.find(".sapUshellGroupListItem")},_getGroupTopOffset:function(g){var G=0,d=sap.ui.getCore().byId("groupListPage");G+=g.parent().parent().position().top;G+=g.position().top;G-=g.parent().parent().parent().position().top;return G},_sortable:function(){var t=this,j=jQuery("#groupListPage").parent();t.bActive=false;this.jgGroupList.find(".sapMListUl").sortable({containment:j,items:'>:not(.sapUshellDefaultGroupItem)',placeholder:"sapUshellGroupLI-placeholder",helper:function(e,a){var c=a.clone(),b=jQuery(".sapUshellGroupListItem");c.addClass("sortableHelperClone");c.addClass("sapUshellClonedGrouplistItem");c.removeClass("li");c.css("font-size",a.css("font-size"));c.css("width",b.first().parent().width());c.css("height",b.first().height()+parseInt(b.first().css("border-bottom-width")));c.hide();window.setTimeout(function(){c.appendTo('body');c.show()},1);return c},revert:jQuery.proxy(this._handleSortableRevert,this),start:jQuery.proxy(this._handleSortableStart,this),stop:jQuery.proxy(this._handleSortableStop,this),change:jQuery.proxy(this._handleSortableChange,this)}).disableSelection();if(!jQuery.device.is.desktop){this.jgGroupList.find(".sapMListUl").sortable('disable')}},_bindGroupListItemEvents:function(e){var g=e.getSource();if(!jQuery.device.is.tablet){return}var t=this;jQuery.sap.byId(g.sId).bind("mousedown",function(a){var _=jQuery(this);if(t.bActive===false&&!_.hasClass("sapUshellDefaultGroupItem")){var b=a;jQuery(".sapUshellGroupItemList").find(".ui-sortable").sortable('disable');clearTimeout(this.fdownTimer);this.fdownTimer=setTimeout(function(){t.bActive=true;jQuery(_).effect("shake",{times:1,distance:5,complete:function(){if(!t.bActive){return}jQuery(".sapUshellGroupItemList").find(".ui-sortable").sortable('enable');var G=sap.ui.getCore().byId("groupListPage"),s=G.getScrollDelegate();s._scroller.disable();_.trigger(b)}},50)},150)}});jQuery.sap.byId(g.sId).bind("mouseup",function(a){clearTimeout(this.fdownTimer);t.bActive=false;if(!jQuery.device.is.desktop){var G=sap.ui.getCore().byId("groupListPage"),s=G.getScrollDelegate();if(!s._scroller.enabled){s._scroller.enable();s._scroller.scrollTo(s._scroller.absStartX,s._scroller.absStartY)}}});jQuery.sap.byId(g.sId).bind("mousemove",function(a){clearTimeout(this.fdownTimer);t.bActive=false})},_handleSortableRevert:function(e,u){return 250},_handleSortableStart:function(e,u){u.placeholder.height(u.helper.outerHeight());var t=this,j=jQuery(this.sViewId).find(".cloneArea");if(j.length<=0){j=jQuery("<div id='cloneArea' class='cloneArea'></div>");jQuery(this.sViewId).append(j)}u.item.addClass("exclude-me");this._getJqAllListItems().each(function(){var g=jQuery(this),c=g.clone(),G=g.position().left,i=t._getGroupTopOffset(g),a=jQuery(".sapUshellGroupListItem");c.addClass("clonedGrouplistItem");g.data("clone",c);c.css("left",G);c.css("top",i+"px");j.append(c);c.css("font-size",a.first().css("font-size"));c.css("width",a.first().parent().width());c.css("height",a.first().height()+parseInt(a.first().css("border-bottom-width")))});this._getJqAllListItems().not(".sortableHelperClone").not(".exclude-me").not(".clonedGrouplistItem").css("visibility","hidden");u.item.data("clone").hide();u.item.startPos=u.item.index();this.oView.oGrouplistDeleteArea.show()},_updateGroupSelection:function(){if(jQuery(".ui-sortable-helper").length>0){return}var h=function(n){var j=jQuery('#dashboardGroups').find('.sapUshellTileContainer'),o=j&&j.first().parent().offset(),f=o&&o.top||0,o=jQuery('#dashboardPage').offset(),e=o&&o.top,a=1200,c=[];if(!j||!o){return}j.each(function(){var g=jQuery(this).parent().offset().top;c.push([g,g+jQuery(this).parent().height()])});var b=jQuery(window).height()-e-j.last().parent().height();b=(b<0)?0:b;jQuery('.sapUshellDashboardGroupsContainer').css("margin-bottom",b+"px");var w=n+f;jQuery.each(c,function(i,g){if(g[0]<=w&&w<=g[1]){jQuery('#groupList .sapUshellDefaultGroupItem, #groupList .sapUshellGroupListItem').removeClass('over').eq(i).addClass('over')}})},d=jQuery("#dashboardPage-cont");if(!jQuery.device.is.desktop){var t=this;if(!this.oDashboardPage){this.oDashboardPage=sap.ui.getCore().byId("dashboardPage");this.oScroller=this.oDashboardPage.getScrollDelegate();this.oOriginalScrollMove=this.oScroller._scroller.options.onScrollMove}this.oScroller._scroller.options.onScrollMove=function(e){t.oOriginalScrollMove.apply(t.oScroller);var n=t.oScroller.getScrollTop();h.call(d,n)};var n=this.oScroller.getScrollTop();h.call(d,n)}else{d.unbind('scroll');d.scroll(function(){var n=jQuery("#dashboardPage-cont").scrollTop();h(n)});var n=jQuery("#dashboardPage-cont").scrollTop();h(n)}},_handleSortableStop:function(e,u){this._getJqAllListItems().removeData("clone").removeClass("exclude-me").css("visibility","visible");jQuery(".clonedGrouplistItem").remove();this.oView.oGrouplistDeleteArea.hide();var f=u.item.startPos,t=u.item.index(),T=sap.ui.getCore().byId(u.item[0].id);if(T){if(!T.bDeletionFlag){this._handleGroupMove(e,u);this.jgGroupList.find(".sapMListUl").sortable('disable');this.oView.oGroupList.invalidate()}else{T.bDeletionFlag=false}}this.jgGroupList.find(".sapMListUl").sortable('cancel');setTimeout(function(){var j=jQuery("#groupList");j.trigger("resize",[j.width(),j.height()])},5);if(!jQuery.device.is.desktop){this.bActive=false;this.jgGroupList.find(".sapMListUl").sortable('disable')}var g=sap.ui.getCore().byId(u.item.attr("id"));window.setTimeout(jQuery.proxy(function(){this._handleScrollToGroup(g);this._updateGroupSelection()},this),1000)},_handleSortableChange:function(e,u){var t=this,o=this._getJqAllListItems().not(".exclude-me").not(".clonedTile");o.each(function(){var g=jQuery(this),c=g.data("clone"),G=g.position().left,i=t._getGroupTopOffset(g);if(c){c.stop(true,false);c.animate({left:G,top:i+"px"},{duration:250},{easing:"swing"})}})},_handleGroupCreate:function(){var f=jQuery(':focus');if(f){f.blur()}this._publishAsync("launchpad","createGroup",{title:sap.ushell.resources.i18n.getText("new_group_name")})},_handleGroupListItemPress:function(s){if(jQuery.device.is.phone){sap.ui.getCore().byId("shell").setShowPane(false);var t=this;setTimeout(function(){t._handleScrollToGroup(s);t._updateGroupSelection()},1000)}else{this._handleScrollToGroup(s);this._updateGroupSelection()}},_handleScrollToGroup:function(g){if(!g){return}this._publishAsync("launchpad","scrollToGroup",{groupId:g.getGroupId()})},_handleGroupMove:function(e,u){var E=sap.ui.getCore().getEventBus(),f=u.item.startPos,t=u.item.index();if(f!==t&&t!==-1){this._publishAsync("launchpad","moveGroup",{fromIndex:f,toIndex:t})}},onCategoryFilter:function(e){var b=sap.ui.getCore().getEventBus(),q=e.getParameter("selectedItem").getText();window.setTimeout(jQuery.proxy(b.publish,b,"catalog","categoryFilter",{category:(q!=="All")?q:null}),1)},_publishAsync:function(c,e,d){var b=sap.ui.getCore().getEventBus();window.setTimeout($.proxy(b.publish,b,c,e,d),1)},_handleGroupListItemOver:function(e){if(this.iOutEventCounter===0&&this.iOverEventCounter===0){this._handleGroupListOver(e)}this.iOutEventFlag=true;var E=sap.ui.getCore().getEventBus();E.publish("grouplist","GroupListItemOver",e);this.iOutEventCounter++},_handleGroupListItemOut:function(e){this.iOutEventCounter--;this.iOutEventFlag=false;var t=this;setTimeout(function(){if(t.iOutEventFlag===false){if(t.iOutEventCounter===0&&t.iOverEventCounter===1){t._handleGroupListOut(e)}}},1);var E=sap.ui.getCore().getEventBus();E.publish("grouplist","GroupListItemOut",e)},_handleGroupListItemDrop:function(e){this.iOutEventCounter=0;this.iOverEventCounter=0;this.iOutEventFlag=false;var E=sap.ui.getCore().getEventBus();E.publish("grouplist","GroupListItemDrop",e)},_handleGroupListOver:function(e){this.iOverEventCounter++;var E=sap.ui.getCore().getEventBus();E.publish("grouplist","GroupListOver",e)},_handleGroupListOut:function(e){this.iOverEventCounter=0;var E=sap.ui.getCore().getEventBus();E.publish("grouplist","GroupListOut",e)}})}());
